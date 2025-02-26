
import ProjectSearch, { SearchFilters } from "@/components/projects/ProjectSearch";
import ProjectCard from "@/components/projects/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const Properties = () => {
  const [filters, setFilters] = useState<SearchFilters | null>(null);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
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
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30 // 30 minutes
  });

  const filteredProjects = useMemo(() => {
    if (!filters) return projects;

    return projects.filter(project => {
      // City filter - check if any selected city matches
      if (filters.cities.length > 0 && !filters.cities.includes(project.city))
        return false;

      // District filter - case-insensitive partial match
      if (filters.district && !project.district.toLowerCase().includes(filters.district.toLowerCase()))
        return false;

      // Property type filter - check if any selected type matches
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(project.property_status))
        return false;

      // Rooms filter - check if any selected room count matches
      if (filters.rooms.length > 0 && !filters.rooms.includes(project.rooms))
        return false;

      // Bathrooms filter - check if any selected bathroom count matches
      if (filters.bathrooms.length > 0 && !filters.bathrooms.includes(project.bathrooms))
        return false;

      // Area range filter
      if (filters.areaRange && (
        project.area < filters.areaRange[0] ||
        project.area > filters.areaRange[1]
      )) return false;

      // Value range filter
      if (filters.valueRange && (
        project.property_value < filters.valueRange[0] ||
        project.property_value > filters.valueRange[1]
      )) return false;

      return true;
    });
  }, [projects, filters]);

  const handleClearFilters = () => {
    setFilters(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <section className="pt-8 pb-24 bg-[#f5f5f5] my-[131px]">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-right">
          <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
            جميع المشاريع
          </h2>
        </div>

        <div className="max-w-[1200px] mx-auto">
          <ProjectSearch onSearch={setFilters} />

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">لا توجد نتائج تطابق معايير البحث</p>
              <p className="text-gray-500 mt-2 mb-6">يرجى تعديل الفلترات والمحاولة مرة أخرى</p>
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="mx-auto flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                مسح الفلتر
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Properties;
