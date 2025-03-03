
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
      
      // Get project details including postal code and features description
      const { data: projectDetails, error: detailsError } = await supabase
        .from("project_details")
        .select("*")
        .eq("project_id", id)
        .single();

      if (detailsError && detailsError.code !== 'PGRST116') {
        console.error("Error fetching project details:", detailsError);
      }

      // Combine project data with details, if available
      const combinedData = {
        ...projectData,
        postalCode: projectDetails?.postal_code || null,
        featuresDescription: projectDetails?.features_description || null
      };

      console.log("Combined project data:", combinedData);
      
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
