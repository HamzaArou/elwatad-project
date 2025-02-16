
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectTabsSection from "@/components/projects/ProjectTabsSection";
import Project360Views from "@/components/projects/Project360Views";
import ContactUs from "@/components/ContactUs";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Header from "@/components/Header";
import NotFound from "@/components/NotFound";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

function ProjectDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-6 w-48" />
      </div>
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </div>
  );
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string | null>(null);

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (!id) throw new Error('Project ID is required');

      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (projectError) throw projectError;
      if (!project) return null;
      return project;
    },
  });

  const handleMediaClick = (mediaUrl: string) => {
    if (!mediaUrl) return;
    setSelectedMediaUrl(mediaUrl);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setTimeout(() => setSelectedMediaUrl(null), 200);
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="mt-[120px]">
          <ProjectDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (error || !project) {
    console.error('Project details error:', error);
    return <NotFound />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-[120px]">
        <div className="mb-12 text-center">
          <p className="text-gold text-xl mb-2">مشروع</p>
          <h1 className="text-5xl font-bold text-gold mb-3">{project.name}</h1>
          <p className="text-2xl text-deepBlue mb-8">{project.location || project.district}</p>
          
          <div className="relative mx-auto bg-gradient-to-b from-deepBlue/10 to-deepBlue/5 p-4 sm:p-6 rounded-[30px] sm:rounded-[40px] shadow-lg w-[350px] sm:w-[450px]">
            <div className="w-[320px] sm:w-[386px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl" style={{ height: '400px' }}>
              <img
                src={project.thumbnail_url}
                alt={project.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="relative py-16 bg-gradient-to-b from-deepBlue/10 to-deepBlue/5 rounded-3xl mb-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-8">
              <h2 className="text-3xl font-bold text-white bg-deepBlue py-2 px-8 rounded-tr-[5px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[5px] inline-block">
                معرض صور وفيديوهات المشروع
              </h2>
            </div>
            
            <ProjectGallery gallery={project.gallery} onImageClick={handleMediaClick} />
          </div>
        </div>

        <ProjectTabsSection 
          details={project.details}
          rooms={project.rooms}
          bathrooms={project.bathrooms}
          area={project.area}
          features={project.features}
          location={project.location || project.district}
        />

        <Project360Views projectId={id} />

        <ContactUs projectId={id} projectName={project.name} />
      </div>

      <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black/90">
          {selectedMediaUrl && (
            <div className="relative w-full aspect-video">
              <img
                src={selectedMediaUrl}
                alt=""
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
