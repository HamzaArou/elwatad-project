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
    queryKey: ['projects'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('projects').select('*');
      if (error) throw error;
      return data || [];
    }
  });
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (selectedNeighborhood === "all" && selectedStatus === "all") {
        return true;
      }
      const neighborhoodMatch = selectedNeighborhood === "all" || project.district === selectedNeighborhood;
      const statusMatch = selectedStatus === "all" || project.status === selectedStatus;
      return neighborhoodMatch && statusMatch;
    }).slice(0, 3); // Only take the first 3 projects
  }, [projects, selectedNeighborhood, selectedStatus]);
  const handleFilterChange = useCallback((neighborhood: string, status: string) => {
    setSelectedNeighborhood(neighborhood);
    setSelectedStatus(status);
  }, []);
  const handleViewAll = useCallback(() => {
    navigate('/properties');
  }, [navigate]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <section id="projects" className="pt-8 pb-24 bg-white">
      <div className="container px-[13px] py-0 mx-0 my-0">
        <div className="mb-6 text-right my-[32px]">
          <h2 className="inline-block bg-white px-4 py-2 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-black font-extrabold text-3xl">مشاريع الوتد</h2>
        </div>

        <div className="max-w-[1200px] px-0 my-0 mx-0 py-0 -mt-16">
          <ProjectSearch onFilterChange={handleFilterChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {filteredProjects.map(project => <ProjectCard key={project.id} project={project} />)}
          </div>

          <div className="flex justify-center mt-8">
            <Button onClick={handleViewAll} className="bg-gold hover:bg-gold/90 text-white px-6 py-2 rounded-full">
              عرض الكل
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default FeaturedProjects;