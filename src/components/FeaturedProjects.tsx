
import { useState, useMemo, useCallback } from "react";
import { Button } from "./ui/button";
import ProjectSearch from "./projects/ProjectSearch";
import ProjectCard from "./projects/ProjectCard";
import MortgageCalculator from "./MortgageCalculator";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const FeaturedProjects = () => {
  const [displayCount, setDisplayCount] = useState(6);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_units(count),
          project_details(*)
        `);

      if (error) throw error;
      return data || [];
    },
  });

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (selectedNeighborhood === "all" && selectedStatus === "all") {
        return true;
      }
      const neighborhoodMatch = selectedNeighborhood === "all" || project.location === selectedNeighborhood;
      const statusMatch = selectedStatus === "all" || project.status === selectedStatus;
      return neighborhoodMatch && statusMatch;
    });
  }, [projects, selectedNeighborhood, selectedStatus]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, displayCount);
  }, [filteredProjects, displayCount]);

  const hasMoreProjects = filteredProjects.length > displayCount;

  const handleLoadMore = useCallback(() => {
    setDisplayCount(prev => Math.min(prev + 3, filteredProjects.length));
  }, [filteredProjects.length]);

  const handleFilterChange = useCallback((neighborhood: string, status: string) => {
    setSelectedNeighborhood(neighborhood);
    setSelectedStatus(status);
    setDisplayCount(6);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section id="projects" className="pt-8 pb-24 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-right">
            <h2 className="text-3xl font-bold text-white inline-block bg-deepBlue px-4 py-2 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px]">
              مشاريع الفيصل
            </h2>
          </div>

          <div className="max-w-[1200px] mx-auto">
            <ProjectSearch onFilterChange={handleFilterChange} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProjects.map((project) => (
                <div key={project.id} className="flex justify-center">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            {hasMoreProjects && (
              <div className="flex justify-end mt-8">
                <Button 
                  onClick={handleLoadMore}
                  className="bg-gold hover:bg-gold/90 text-white px-6 py-2 rounded-full"
                >
                  عرض المزيد..
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      <MortgageCalculator />
    </>
  );
};

export default FeaturedProjects;
