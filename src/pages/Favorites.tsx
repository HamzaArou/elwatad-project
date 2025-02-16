import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ProjectCard from "@/components/projects/ProjectCard";
const Favorites = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/register', {
        state: {
          redirectTo: '/favorites'
        }
      });
    }
  }, [user, navigate]);
  const {
    data: favorites = [],
    isLoading
  } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const {
        data: favoritesData,
        error
      } = await supabase.from('favorites').select(`
          project_id,
          projects (
            id,
            name,
            city,
            district,
            status,
            property_value,
            rooms,
            bathrooms,
            area,
            thumbnail_url
          )
        `).eq('user_id', user.id);
      if (error) {
        console.error('Error fetching favorites:', error);
        throw error;
      }
      console.log('Fetched favorites:', favoritesData);
      return favoritesData.map(f => f.projects);
    },
    enabled: !!user
  });
  if (!user) {
    return null;
  }
  if (isLoading) {
    return <div className="min-h-screen pt-32 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-right mb-8">جاري التحميل...</h1>
        </div>
      </div>;
  }
  return <div className="min-h-screen pt-32 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-right mb-8 font-extrabold text-5xl">المفضلة</h1>
        {favorites.length === 0 ? <p className="text-center text-gray-500 mt-8">لم تقم بإضافة أي عقارات إلى المفضلة بعد</p> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {favorites.map(project => <ProjectCard key={project.id} project={project} />)}
          </div>}
      </div>
    </div>;
};
export default Favorites;