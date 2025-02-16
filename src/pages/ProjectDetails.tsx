
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProjectTabsSection from "@/components/projects/ProjectTabsSection";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectLocation from "@/components/projects/ProjectLocation";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: projectData, isLoading: isLoadingProject } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) throw new Error("No project ID provided");
      
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (projectError) throw projectError;

      const { data: details, error: detailsError } = await supabase
        .from("project_details")
        .select("*")
        .eq("project_id", id)
        .single();

      if (detailsError && detailsError.code !== 'PGRST116') throw detailsError;

      const { data: media, error: mediaError } = await supabase
        .from("project_media")
        .select("*")
        .eq("project_id", id)
        .order("display_order");

      if (mediaError) throw mediaError;

      const { data: features, error: featuresError } = await supabase
        .from("project_features")
        .select("*")
        .eq("project_id", id);

      if (featuresError) throw featuresError;

      return {
        ...project,
        details: details?.details,
        lat: details?.lat,
        lng: details?.lng,
        media: media || [],
        features: features || [],
      };
    },
  });

  if (isLoadingProject) {
    return <div>Loading...</div>;
  }

  if (!projectData) {
    return <div>Project not found</div>;
  }

  const galleryItems = projectData.media.map(item => ({
    id: item.id,
    url: item.media_url,
    type: item.media_type as 'image' | 'video',
    content_type: 'gallery'
  }));

  return (
    <div>
      <ProjectGallery gallery={galleryItems} />
      <ProjectTabsSection
        details={projectData.details}
        rooms={projectData.rooms}
        bathrooms={projectData.bathrooms}
        area={projectData.area}
        features={projectData.features.map(f => `${f.feature_type} (${f.amount})`)}
        location={projectData.location || ""}
        lat={projectData.lat}
        lng={projectData.lng}
      />
    </div>
  );
}
