import { useNavigate } from "react-router-dom";
import { useCallback, memo, useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Home, Bath, Ruler, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface Project {
  id: string;
  name: string;
  city: string;
  district: string;
  status: string;
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
    case "تم البيع بالكامل":
      return "bg-gold text-white";
    case "قريباً":
      return "bg-newsGreen text-white";
    case "بدأ البيع":
      return "bg-deepBlue text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const formatPrice = (price?: number) => {
  if (!price) return "السعر عند الطلب";
  return `${price.toLocaleString('ar-SA')} ريال`;
};

const ProjectCard = memo(({ project }: ProjectCardProps) => {
  const navigate = useNavigate();
  const { user, toggleFavorite, isFavorite } = useAuth();
  const { toast } = useToast();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (user) {
      isFavorite(project.id).then(setIsFav);
    }
  }, [user, project.id, isFavorite]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (window.getSelection()?.toString()) {
      return;
    }
    navigate(`/project/${project.id}`);
  }, [navigate, project.id]);

  const handleHeartClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/register');
      return;
    }

    try {
      await toggleFavorite(project.id);
      setIsFav(!isFav);
      toast({
        description: isFav ? "تمت إزالة العقار من المفضلة" : "تمت إضافة العقار إلى المفضلة",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "حدث خطأ ما. الرجاء المحاولة مرة أخرى.",
      });
    }
  }, [user, navigate, project.id, toggleFavorite, isFav, toast]);

  return (
    <div 
      onClick={handleClick} 
      className="cursor-pointer group w-full max-w-[360px]"
      role="button"
      tabIndex={0}
    >
      <div className="relative h-[448px] overflow-hidden rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02]">
        {/* Background Image */}
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
        
        {/* Dark Overlay - Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Status Badge */}
        <Badge 
          className={`absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}
        >
          {project.status}
        </Badge>

        {/* Heart Icon */}
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

        {/* Main Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Base Info Container */}
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

          {/* Stats Grid - Hidden by default */}
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
