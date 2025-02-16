
import { useState, useMemo, useCallback } from "react";
import { Button } from "./ui/button";
import ProjectSearch from "./projects/ProjectSearch";
import ProjectCard from "./projects/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const FeaturedProjects = () => {
  const navigate = useNavigate();
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  const {
    data: projects = [],
    isLoading
  } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
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
        `)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    cacheTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  });

  const handleFilterChange = useCallback((neighborhood: string, status: string) => {
    setSelectedNeighborhood(neighborhood);
    setSelectedStatus(status);
  }, []);

  const handleViewAll = useCallback(() => {
    navigate('/properties');
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <section id="projects" className="pt-8 pb-2 bg-white">
      <div className="container px-[13px] py-0 mx-0 my-0">
        <div className="mb-6 text-right my-[32px]">
          <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
            مشاريع الوتد
          </h2>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 py-0 -mt-3">
          <ProjectSearch onFilterChange={handleFilterChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleViewAll} 
              className="bg-[#B69665] hover:bg-[#B69665]/90 text-white font-bold text-lg rounded-full shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 px-[34px] py-[35px]"
            >
              عرض كل العقارات
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
