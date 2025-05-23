
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
        .single();

      if (detailsError && detailsError.code !== 'PGRST116') {
        console.error("Error fetching project details:", detailsError);
      }

      // Process views360 data to ensure it's in the correct format for the form
      let formattedViews360 = [];
      if (projectDetails?.views360) {
        try {
          // If it's already an array of objects (parsed from a JSON string)
          if (typeof projectDetails.views360 === 'string') {
            if (projectDetails.views360.startsWith('[')) {
              // Try parsing as JSON array
              try {
                const parsedViews = JSON.parse(projectDetails.views360);
                if (Array.isArray(parsedViews)) {
                  formattedViews360 = parsedViews.map(view => ({
                    id: view.id || crypto.randomUUID(),
                    title: view.title || "جولة افتراضية",
                    url: view.url || ""
                  }));
                }
              } catch (e) {
                console.error("Error parsing views360 JSON:", e);
              }
            } else if (projectDetails.views360.startsWith('http')) {
              // Single URL - create with default title
              formattedViews360 = [{
                id: crypto.randomUUID(),
                title: "جولة افتراضية 360°",
                url: projectDetails.views360
              }];
            } else {
              // Plain text that's not a URL or JSON - just use as is
              formattedViews360 = [{
                id: crypto.randomUUID(),
                title: "جولة افتراضية 360°",
                url: projectDetails.views360
              }];
            }
          }
        } catch (err) {
          console.error("Error processing views360 data:", err);
          formattedViews360 = [];
        }
      }

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
