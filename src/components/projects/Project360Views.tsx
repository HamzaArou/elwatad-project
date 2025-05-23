
import { Rotate3d } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Project360View {
  id: string;
  title: string;
  url: string;
}

interface Project360ViewsProps {
  projectId: string | undefined;
}

export default function Project360Views({ projectId }: Project360ViewsProps) {
  const { data: views, isLoading } = useQuery({
    queryKey: ['project-views360', projectId],
    queryFn: async () => {
      if (!projectId) return [];
      
      try {
        const { data: projectDetails, error } = await supabase
          .from('project_details')
          .select('views360')
          .eq('project_id', projectId)
          .single();

        if (error) {
          console.error("Error fetching views360:", error);
          return [];
        }
        
        // If no data returned
        if (!projectDetails || projectDetails.views360 === null) {
          return [];
        }

        const views360Data = projectDetails.views360;
        
        // If it's a simple string URL, return a single view
        if (typeof views360Data === 'string') {
          // Try to parse as JSON first
          if (views360Data.startsWith('[')) {
            try {
              const parsed = JSON.parse(views360Data);
              
              if (Array.isArray(parsed)) {
                return parsed.map((view: any) => ({
                  id: view.id || crypto.randomUUID(),
                  title: view.title || "جولة افتراضية",
                  url: view.url || ""
                }));
              }
            } catch (e) {
              // Not valid JSON
              console.error("Error parsing views360 JSON:", e);
            }
          }
          
          // If it starts with http, it's a direct URL
          if (views360Data.includes('http')) {
            return [{
              id: crypto.randomUUID(),
              title: "جولة افتراضية 360°",
              url: views360Data
            }];
          }
        }
        
        return [];
      } catch (err) {
        console.error("Error processing views360 data:", err);
        return [];
      }
    },
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deepBlue"></div>
      </div>
    );
  }

  if (!views?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Rotate3d className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-500 mb-2">لا توجد جولات افتراضية</h3>
        <p className="text-gray-400">
          هذا المشروع لا يحتوي على جولات افتراضية 360° في الوقت الحالي
        </p>
      </div>
    );
  }

  return (
    <div className="relative py-12 bg-gradient-to-b from-deepBlue/10 to-deepBlue/5 rounded-3xl mb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <h2 className="text-3xl font-bold text-white bg-deepBlue py-2 px-8 rounded-tr-[5px] rounded-tl-[100px] rounded-br-[100px] rounded-bl-[5px] inline-block">
            جولة افتراضية 360° للمشروع
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {views.map((view) => (
            <a
              key={view.id}
              href={view.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-3">
                <Rotate3d className="w-10 h-10 text-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-deepBlue mb-1">{view.title}</h3>
              <p className="text-gray-600 text-sm">
                انقر لمشاهدة جولة افتراضية 360° درجة
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
