import ProjectSearch from "@/components/projects/ProjectSearch";
import ProjectCard from "@/components/projects/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
const Properties = () => {
  const {
    data: projects = [],
    isLoading
  } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('projects').select(`
          id,
          name,
          city,
          district,
          property_status,
          property_value,
          rooms,
          bathrooms,
          area,
          thumbnail_url
        `).order('created_at', {
        ascending: false
      });
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
    // Cache for 5 minutes
    cacheTime: 1000 * 60 * 30 // Keep in cache for 30 minutes
  });
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">جاري التحميل...</div>
      </div>;
  }
  return <section className="pt-8 pb-24 bg-[#f5f5f5] my-[131px]">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-right">
          <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
            جميع المشاريع
          </h2>
        </div>

        <div className="max-w-[1200px] mx-auto">
          <ProjectSearch onFilterChange={(neighborhood, status) => {}} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {projects.map(project => <ProjectCard key={project.id} project={project} />)}
          </div>
        </div>
      </div>
    </section>;
};
export default Properties;