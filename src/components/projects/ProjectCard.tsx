
import { useNavigate } from "react-router-dom";
import { useCallback, memo, useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Home, Bath, Ruler, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  name: string;
  city: "مدينة مكة" | "مدينة جدة";
  district: string;
  property_status: "فيلا" | "شقة" | "روف" | "أرض";
  property_value: number;
  rooms: number;
  bathrooms: number;
  area: number;
  thumbnail_url: string;
}

interface ProjectCardProps {
  project: Project;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "فيلا":
      return "bg-gold text-white";
    case "شقة":
      return "bg-newsGreen text-white";
    case "روف":
      return "bg-deepBlue text-white";
    case "أرض":
      return "bg-gray-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const formatPrice = (price?: number) => {
  if (!price) return "السعر عند الطلب";
  return `${price.toLocaleString('en-US')} ريال`;
};

const ProjectCard = memo(({ project }: ProjectCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select()
          .eq('user_id', user.id)
          .eq('project_id', project.id)
          .maybeSingle();

        if (error) {
          console.error('Error checking favorite status:', error);
          return;
        }

        setIsFav(!!data);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [user, project.id]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (window.getSelection()?.toString()) {
      return;
    }
    navigate(`/project/${project.id}`);
    window.scrollTo(0, 0);
  }, [navigate, project.id]);

  const handleHeartClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/register', { state: { redirectTo: '/' } });
      window.scrollTo(0, 0);
      return;
    }

    try {
      if (isFav) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('project_id', project.id);

        if (error) throw error;
        
        setIsFav(false);
        toast({
          description: "تمت إزالة العقار من المفضلة",
        });
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert([
            {
              user_id: user.id,
              project_id: project.id
            }
          ]);

        if (error) throw error;
        
        setIsFav(true);
        toast({
          description: "تمت إضافة العقار إلى المفضلة",
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        variant: "destructive",
        description: "حدث خطأ ما. الرجاء المحاولة مرة أخرى.",
      });
    }
  }, [user, navigate, project.id, isFav, toast]);

  return (
    <div 
      onClick={handleClick} 
      className="cursor-pointer group w-full max-w-[360px]"
      role="button"
      tabIndex={0}
    >
      <div className="relative h-[448px] overflow-hidden rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02]">
        <img
          src={project.thumbnail_url}
          alt={project.city}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          fetchPriority="high"
          onError={(e) => {
            console.error('Image failed to load:', project.thumbnail_url);
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <Badge 
          className={`absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(project.property_status)}`}
        >
          {project.property_status}
        </Badge>

        <button
          onClick={handleHeartClick}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-colors ${
            isFav 
              ? 'bg-white/20 text-red-500' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className="w-6 h-6" fill={isFav ? "currentColor" : "none"} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="space-y-2 transform transition-transform duration-300 group-hover:translate-y-[-80px]">
            <h3 className="text-2xl font-bold text-right text-white">
              {formatPrice(project.property_value)}
            </h3>
            <div className="text-right">
              <p className="text-lg text-white">
                {project.city}
              </p>
              <p className="text-sm text-white/80">
                <span className="font-medium ml-1">المنطقة:</span>
                {project.district}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 opacity-0 transform translate-y-8 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Home className="w-5 h-5 text-white mb-1" />
              <p className="text-sm font-medium text-white">{project.rooms} غرف</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Bath className="w-5 h-5 text-white mb-1" />
              <p className="text-sm font-medium text-white">{project.bathrooms} حمام</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Ruler className="w-5 h-5 text-white mb-1" />
              <p className="text-sm font-medium text-white">{project.area} م²</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
