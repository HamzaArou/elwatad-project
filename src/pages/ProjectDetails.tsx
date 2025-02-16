import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProjectTabsSection from "@/components/projects/ProjectTabsSection";
import ProjectGallery from "@/components/projects/ProjectGallery";
import RegisterInterestDialog from "@/components/RegisterInterestDialog";
import { Building2, Bed, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
export default function ProjectDetails() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    data: projectData,
    isLoading: isLoadingProject
  } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) throw new Error("No project ID provided");
      const {
        data: project,
        error: projectError
      } = await supabase.from("projects").select(`
          id,
          name,
          location,
          district,
          property_status,
          property_value,
          rooms,
          bathrooms,
          area,
          thumbnail_url
        `).eq("id", id).single();
      if (projectError) throw projectError;
      const {
        data: details,
        error: detailsError
      } = await supabase.from("project_details").select("*").eq("project_id", id).single();
      if (detailsError && detailsError.code !== 'PGRST116') throw detailsError;
      const {
        data: media,
        error: mediaError
      } = await supabase.from("project_media").select("*").eq("project_id", id).order("display_order");
      if (mediaError) throw mediaError;
      const {
        data: features,
        error: featuresError
      } = await supabase.from("project_features").select("*").eq("project_id", id);
      if (featuresError) throw featuresError;
      return {
        ...project,
        details: details?.details,
        lat: details?.lat,
        lng: details?.lng,
        media: media || [],
        features: features || []
      };
    }
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
  const formatPrice = (price?: number) => {
    if (!price) return "السعر عند الطلب";
    return `${price.toLocaleString('ar-SA')} ريال`;
  };
  return <div className="min-h-screen bg-gray-50">
      {/* Project Card Section */}
      <div className="pt-[140px] pb-8"> {/* Added top padding to account for header height */}
        <div className="max-w-[400px] mx-auto px-4"> {/* Fixed width container for consistent sizing */}
          <Card className="overflow-hidden rounded-[24px] shadow-lg"> {/* Increased border radius */}
            <div className="relative h-[400px]">
              <img src={projectData.thumbnail_url} alt={projectData.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex justify-between items-end">
                  <div className="text-right">
                    
                    <h1 className="text-3xl font-bold mb-2 text-slate-50">{projectData.name}</h1>
                    <p className="text-lg opacity-90">{projectData.location}</p>
                  </div>
                  <div className="text-right">
                    
                    
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 p-6 bg-white">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Square className="w-5 h-5 text-deepBlue" />
                <div>
                  <div className="text-sm text-gray-600">المساحة</div>
                  <div className="font-semibold">{projectData.area} م²</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Bed className="w-5 h-5 text-deepBlue" />
                <div>
                  <div className="text-sm text-gray-600">غرف النوم</div>
                  <div className="font-semibold">{projectData.rooms}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Bath className="w-5 h-5 text-deepBlue" />
                <div>
                  <div className="text-sm text-gray-600">الحمامات</div>
                  <div className="font-semibold">{projectData.bathrooms}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Building2 className="w-5 h-5 text-deepBlue" />
                <div>
                  <div className="text-sm text-gray-600">المنطقة</div>
                  <div className="font-semibold">{projectData.district}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto px-4 py-8">
        <ProjectGallery gallery={galleryItems} />
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 pb-12">
        <ProjectTabsSection details={projectData.details} rooms={projectData.rooms} bathrooms={projectData.bathrooms} area={projectData.area} features={projectData.features.map(f => `${f.feature_type} (${f.amount})`)} location={projectData.location || ""} lat={projectData.lat} lng={projectData.lng} />
      </div>

      {/* Contact Section */}
      <div className="bg-white shadow-md mt-12">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">هل تريد معرفة المزيد عن هذا المشروع؟</h2>
            <p className="text-xl text-gray-600 mb-8">
              يمكنك التواصل معنا للحصول على مزيد من المعلومات حول المشروع والحجز
            </p>
            <RegisterInterestDialog>
              <Button size="lg" className="bg-deepBlue hover:bg-deepBlue/90 text-lg px-8 py-6">
                تواصل معنا
              </Button>
            </RegisterInterestDialog>
          </div>
        </div>
      </div>
    </div>;
}