import AdminLayout from "@/components/admin/AdminLayout";
import ProjectTabsSection from "@/components/projects/ProjectTabsSection";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function ProjectDetailsPage() {
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
      
      // Get project details including postal code
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
        postalCode: projectDetails?.postal_code || null
      };

      return combinedData;
    },
    enabled: !!id,
  });

  if (isLoading || !project) {
    return (
      <AdminLayout>
        <div className="text-center">جاري التحميل...</div>
      </AdminLayout>
    );
  }

  if (!id) {
    return (
      <AdminLayout>
        <div className="text-center">Project ID is missing.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <ProjectTabsSection 
          details={project.details} 
          rooms={project.rooms} 
          bathrooms={project.bathrooms} 
          area={project.area} 
          features={project.features || []} 
          location={project.location} 
          lat={project.lat} 
          lng={project.lng} 
          postalCode={project.postalCode} 
          projectId={id}
        />
      </div>
    </AdminLayout>
  );
}
