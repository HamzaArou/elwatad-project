
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile, uploadFiles } from "./FileUploadHandler";
import { NavigateFunction } from "react-router-dom";

export const useFormSubmission = (
  form: UseFormReturn<ProjectFormValues>,
  thumbnail: File | null,
  galleryImages: FileList | null,
  plans: FileList | null,
  initialData: any,
  navigate: NavigateFunction,
  setIsLoading: (loading: boolean) => void
) => {
  const { toast } = useToast();

  const submitForm = async (data: ProjectFormValues) => {
    console.log("Starting form submission with data:", data);
    setIsLoading(true);

    try {
      // Upload thumbnail
      let thumbnailUrl = initialData?.thumbnail_url;
      if (thumbnail) {
        console.log("Uploading thumbnail...");
        thumbnailUrl = await uploadFile(thumbnail, "project-images");
      }

      if (!thumbnailUrl) {
        throw new Error("صورة المشروع مطلوبة");
      }

      // Prepare project data
      const projectData = {
        name: data.name,
        location: data.location,
        address: data.address || null,
        lat: data.lat || null,
        lng: data.lng || null,
        floors: data.floors,
        units: data.units,
        status: data.status,
        thumbnail_url: thumbnailUrl,
        // Add missing required fields for project table
        area: 0, // Default value
        district: data.location || "", // Use location as district if not provided
        property_status: "فيلا" as "فيلا", // Default value with type assertion
        property_value: 0, // Default value
      };

      console.log("Project data to be inserted:", projectData);

      // Create new project or update existing
      let projectId = initialData?.id;
      
      if (projectId) {
        // Update existing project
        const { error: updateError } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", projectId);
          
        if (updateError) {
          console.error("Error updating project:", updateError);
          throw updateError;
        }
      } else {
        // Create new project
        const { data: newProject, error: insertError } = await supabase
          .from("projects")
          .insert(projectData)
          .select()
          .single();

        if (insertError) {
          console.error("Error creating project:", insertError);
          throw insertError;
        }

        if (!newProject) {
          throw new Error("Failed to create project - no data returned");
        }

        projectId = newProject.id;
      }
      
      console.log("Project ID:", projectId);

      // Ensure views360 is properly formatted
      // Always store as an array of objects with id, title, and url
      let validViews360 = [];
      if (data.views360 && Array.isArray(data.views360)) {
        validViews360 = data.views360.map(view => ({
          id: view.id || crypto.randomUUID(),
          title: view.title || "جولة افتراضية",
          url: view.url || ""
        }));
      }
      
      // Handle project details with postal code, status, and 360 views
      const projectDetailsData = {
        project_id: projectId,
        lat: data.lat || null,
        lng: data.lng || null,
        postal_code: data.postalCode || null,
        status: data.projectStatus || "متاح",
        views360: validViews360
      };

      // Check if project details already exist
      const { data: existingDetails } = await supabase
        .from("project_details")
        .select("id")
        .eq("project_id", projectId)
        .maybeSingle();

      if (existingDetails) {
        // Update existing details
        const { error: detailsUpdateError } = await supabase
          .from("project_details")
          .update(projectDetailsData)
          .eq("project_id", projectId);

        if (detailsUpdateError) {
          console.error("Error updating project details:", detailsUpdateError);
          throw detailsUpdateError;
        }
      } else {
        // Insert new details
        const { error: detailsError } = await supabase
          .from("project_details")
          .insert(projectDetailsData);

        if (detailsError) {
          console.error("Error inserting project details:", detailsError);
          throw detailsError;
        }
      }

      // Handle units
      if (data.project_units && data.project_units.length > 0) {
        // First, delete existing units for this project
        if (initialData?.id) {
          const { error: deleteUnitsError } = await supabase
            .from("project_units")
            .delete()
            .eq("project_id", projectId);
            
          if (deleteUnitsError) {
            console.error("Error deleting existing units:", deleteUnitsError);
          }
        }
        
        // Then add the new/updated units
        const unitsData = data.project_units.map(unit => ({
          project_id: projectId,
          name: unit.name,
          area: unit.area,
          unit_number: unit.unit_number,
          status: unit.status,
          unit_type: unit.unit_type,
          floor_number: unit.floor_number,
          side: unit.side,
          rooms: unit.rooms,
          bathrooms: unit.bathrooms,
          details: unit.details || {}
        }));

        const { error: unitsError } = await supabase
          .from("project_units")
          .insert(unitsData);

        if (unitsError) {
          console.error("Error inserting units:", unitsError);
          throw unitsError;
        }
      }

      // Handle gallery images
      if (data.gallery_type === "images" && galleryImages && galleryImages.length > 0) {
        const filesArray = Array.from(galleryImages);
        const urls = await uploadFiles(filesArray, "project-images");
        
        const galleryData = urls.map(url => ({
          project_id: projectId,
          media_url: url,
          content_type: "gallery",
          media_type: "image"
        }));

        const { error: imagesError } = await supabase
          .from("project_media")
          .insert(galleryData);

        if (imagesError) {
          console.error("Error inserting gallery images:", imagesError);
          throw imagesError;
        }
      }

      // Handle plans
      if (plans && plans.length > 0) {
        const filesArray = Array.from(plans);
        const urls = await uploadFiles(filesArray, "project-plans");
        
        const plansData = urls.map(url => ({
          project_id: projectId,
          media_url: url,
          media_type: "image",
          content_type: "plan"
        }));

        const { error: plansError } = await supabase
          .from("project_media")
          .insert(plansData);

        if (plansError) {
          console.error("Error inserting plans:", plansError);
          throw plansError;
        }
      }

      toast({
        title: initialData?.id ? "تم التحديث" : "تم الإنشاء",
        description: initialData?.id ? "تم تحديث المشروع بنجاح" : "تم إنشاء المشروع بنجاح",
      });

      console.log("Form submission completed successfully!");
      navigate("/admin");
    } catch (error: any) {
      console.error("Error during form submission:", error);
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء حفظ المشروع",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitForm };
};
