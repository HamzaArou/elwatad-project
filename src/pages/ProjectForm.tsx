
import AdminLayout from "@/components/admin/AdminLayout";
import ProjectForm from "@/components/admin/ProjectForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function ProjectFormPage() {
  const { id } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) return null;
      
      // Get project data
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (projectError) throw projectError;
      
      // Get project details including postal code and views360
      const { data: projectDetails, error: detailsError } = await supabase
        .from("project_details")
        .select("*")
        .eq("project_id", id)
        .maybeSingle();

      if (detailsError && detailsError.code !== 'PGRST116') {
        console.error("Error fetching project details:", detailsError);
      }

      // Process views360 data to ensure it's in the correct format for the form
      let formattedViews360 = [];
      if (projectDetails?.views360) {
        try {
          // Handle array format (from database)
          if (Array.isArray(projectDetails.views360)) {
            formattedViews360 = projectDetails.views360.map((view: any) => ({
              id: view.id || crypto.randomUUID(),
              title: view.title || "جولة افتراضية",
              url: view.url || ""
            }));
          } 
          // Handle string format (legacy case)
          else if (typeof projectDetails.views360 === 'string') {
            formattedViews360 = [
              {
                id: crypto.randomUUID(),
                title: "جولة افتراضية",
                url: projectDetails.views360
              }
            ];
          }
          // Handle JSON string that might be parsed (very unlikely but handling just in case)
          else if (typeof projectDetails.views360 === 'object') {
            console.log("Object format views360:", projectDetails.views360);
            formattedViews360 = [
              {
                id: crypto.randomUUID(),
                title: "جولة افتراضية",
                url: JSON.stringify(projectDetails.views360)
              }
            ];
          }
        } catch (err) {
          console.error("Error formatting views360:", err, projectDetails.views360);
          formattedViews360 = [];
        }
      }

      console.log("Formatted views360 data:", formattedViews360);

      // Combine project data with details, if available
      const combinedData = {
        ...projectData,
        postalCode: projectDetails?.postal_code || null,
        views360: formattedViews360
      };

      return combinedData;
    },
    enabled: !!id,
  });

  if (id && isLoading) {
    return (
      <AdminLayout>
        <div className="text-center">جاري التحميل...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">
          {id ? "تعديل المشروع" : "إنشاء مشروع جديد"}
        </h2>
        <ProjectForm initialData={project} />
      </div>
    </AdminLayout>
  );
}
