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
        address: data.address,
        lat: data.lat || null,
        lng: data.lng || null,
        floors: data.floors,
        units: data.units,
        status: data.status,
        thumbnail_url: thumbnailUrl,
      };

      console.log("Project data prepared:", projectData);

      // Create new project
      console.log("Creating new project...");
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

      const projectId = newProject.id;
      console.log("New project created with ID:", projectId);

      // Handle units
      if (data.project_units && data.project_units.length > 0) {
        console.log("Handling project units...");
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
        }));

        console.log("Inserting units:", unitsData);
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
        console.log("Uploading gallery images...");
        const urls = await uploadFiles(galleryImages, "project-images");
        
        console.log("Inserting gallery images...");
        const { error: imagesError } = await supabase
          .from("project_images")
          .insert(
            urls.map(url => ({
              project_id: projectId,
              image_url: url,
              image_type: "gallery",
            }))
          );

        if (imagesError) {
          console.error("Error inserting gallery images:", imagesError);
          throw imagesError;
        }
      }

      // Handle plans
      if (plans && plans.length > 0) {
        console.log("Uploading plans...");
        const urls = await uploadFiles(plans, "project-plans");
        
        console.log("Inserting plans...");
        const { error: plansError } = await supabase
          .from("project_plans")
          .insert(
            urls.map(url => ({
              project_id: projectId,
              file_url: url,
            }))
          );

        if (plansError) {
          console.error("Error inserting plans:", plansError);
          throw plansError;
        }
      }

      toast({
        title: "تم الإنشاء",
        description: "تم إنشاء المشروع بنجاح",
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