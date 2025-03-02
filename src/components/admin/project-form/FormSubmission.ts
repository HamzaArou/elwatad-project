
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues, ProjectUnit, View360 } from "@/types/project";
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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  const submitForm = async (data: ProjectFormValues) => {
    try {
      setIsLoading(true);
      console.log("Submitting form data:", data);

      let thumbnailUrl = initialData?.thumbnail_url || "";

      // Upload thumbnail if it exists
      if (thumbnail) {
        const file = thumbnail;
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from("project-images")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from("project-images")
          .getPublicUrl(filePath);

        thumbnailUrl = urlData.publicUrl;
      }

      // Prepare project data
      const projectData = {
        name: data.name,
        location: data.location,
        address: data.address,
        lat: data.lat || null,
        lng: data.lng || null,
        district: data.district || "غير محدد",
        property_status: data.status,
        rooms: data.rooms || 0,
        bathrooms: data.bathrooms || 0,
        area: data.area || 0,
        property_value: data.price || 0,
        thumbnail_url: thumbnailUrl,
        city: data.city,
      };

      let projectId = initialData?.id;

      // Create or update project
      if (!projectId) {
        const { data: newProject, error: projectError } = await supabase
          .from("projects")
          .insert(projectData)
          .select("id")
          .single();

        if (projectError) throw projectError;
        projectId = newProject.id;
      } else {
        const { error: updateError } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", projectId);

        if (updateError) throw updateError;
      }

      // Update or create project details with postal code
      const projectDetails = {
        project_id: projectId,
        details: data.details || "",
        lat: data.lat || null,
        lng: data.lng || null,
        postal_code: data.postalCode || null,
      };

      const { error: detailsError } = await supabase
        .from("project_details")
        .upsert([projectDetails], { onConflict: 'project_id' });

      if (detailsError) throw detailsError;

      // Handle gallery images if they exist
      if (galleryImages && galleryImages.length > 0) {
        await handleGalleryImages(galleryImages, projectId);
      }

      // Handle project units
      if (data.project_units && data.project_units.length > 0) {
        await handleProjectUnits(data.project_units, projectId);
      }

      // Handle 360 views
      if (data.views360 && data.views360.length > 0) {
        await handle360Views(data.views360, projectId);
      }

      // Handle floor plans
      if (plans && plans.length > 0) {
        await handlePlans(plans, projectId);
      }

      console.log("Form submission completed successfully");
      navigate("/admin");
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function for handling gallery images
  const handleGalleryImages = async (images: FileList, projectId: string) => {
    const uploadPromises = [];
    const mediaToInsert = [];
    
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = fileName;

      uploadPromises.push(
        supabase.storage
          .from("project-images")
          .upload(filePath, file)
          .then(({ error, data }) => {
            if (error) throw error;
            
            return supabase.storage
              .from("project-images")
              .getPublicUrl(filePath);
          })
          .then(({ data }) => {
            mediaToInsert.push({
              project_id: projectId,
              media_url: data.publicUrl,
              media_type: "image",
              display_order: i,
              content_type: "gallery"
            });
          })
      );
    }
    
    await Promise.all(uploadPromises);
    
    if (mediaToInsert.length > 0) {
      console.log("Inserting gallery images...");
      const { error: imagesError } = await supabase
        .from("project_media")
        .insert(mediaToInsert);

      if (imagesError) {
        console.error("Error inserting gallery images:", imagesError);
        throw imagesError;
      }
    }
  };

  // Helper function for handling project units
  const handleProjectUnits = async (units: ProjectUnit[], projectId: string) => {
    const unitsData = units.map(unit => ({
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
  };

  // Helper function for handling 360 views
  const handle360Views = async (views: View360[], projectId: string) => {
    try {
      // Delete existing 360 views for this project
      const { error: deleteError } = await supabase
        .from("project_media")
        .delete()
        .eq("project_id", projectId)
        .eq("media_type", "view360");

      if (deleteError) throw deleteError;

      // Insert new 360 views
      const viewsToInsert = views.map((view, index) => ({
        project_id: projectId,
        media_type: "view360" as const,
        media_url: view.url,
        display_order: index,
      }));

      if (viewsToInsert.length > 0) {
        const { error: insertError } = await supabase
          .from("project_media")
          .insert(viewsToInsert);

        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error("Error handling 360 views:", error);
      throw error;
    }
  };

  // Helper function for handling plans
  const handlePlans = async (plans: FileList, projectId: string) => {
    try {
      // Upload plans
      const uploadedPlans = [];

      for (let i = 0; i < plans.length; i++) {
        const file = plans[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("project-images")
          .getPublicUrl(filePath);

        uploadedPlans.push({
          project_id: projectId,
          media_type: "plan" as const,
          media_url: urlData.publicUrl,
          display_order: i,
        });
      }

      // Delete existing plans
      const { error: deleteError } = await supabase
        .from("project_media")
        .delete()
        .eq("project_id", projectId)
        .eq("media_type", "plan");

      if (deleteError) throw deleteError;

      // Insert new plans
      if (uploadedPlans.length > 0) {
        const { error: insertError } = await supabase
          .from("project_media")
          .insert(uploadedPlans);

        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error("Error handling plans:", error);
      throw error;
    }
  };

  return { submitForm };
};
