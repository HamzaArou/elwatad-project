import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './projects/ProjectCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const FeaturedProjects = () => {
  const navigate = useNavigate();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['featuredProjects'],
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
        .limit(6)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30 // 30 minutes
  });

  const handleViewAllProjects = () => {
    navigate('/properties');
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white" id="properties">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-right">
            <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
              المشاريع المميزة
            </h2>
          </div>
          <div className="text-center">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white" id="properties">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-right">
          <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
            المشاريع المميزة
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={handleViewAllProjects}
            className="bg-[#2F4447] text-white px-8 py-4 rounded-lg hover:bg-[#2F4447]/90 transition-colors duration-300"
          >
            عرض كل العقارات
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
