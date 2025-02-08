
import { useNavigate } from "react-router-dom";
import { useCallback, memo } from "react";
import { Badge } from "../ui/badge";
import { Home, Bath, Ruler } from "lucide-react";

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

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (window.getSelection()?.toString()) {
      return;
    }
    navigate(`/project/${project.id}`);
  }, [navigate, project.id]);

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
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          fetchPriority="high"
          onError={(e) => {
            console.error('Image failed to load:', project.thumbnail_url);
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/60" />

        {/* Status Badge */}
        <Badge 
          className={`absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}
        >
          {project.status}
        </Badge>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
          {/* Always Visible Content */}
          <div className="text-right">
            <p className="text-2xl font-bold mb-2">
              {formatPrice(project.property_value)}
            </p>
            <p className="text-lg">
              {project.city}
            </p>
          </div>

          {/* Content Revealed on Hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-right mb-6">
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium ml-1">المنطقة:</span>
                  {project.district}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm rounded-lg p-3">
                <Home className="w-5 h-5 text-white mb-1" />
                <p className="text-sm font-medium">{project.rooms} غرف</p>
              </div>
              <div className="flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm rounded-lg p-3">
                <Bath className="w-5 h-5 text-white mb-1" />
                <p className="text-sm font-medium">{project.bathrooms} حمام</p>
              </div>
              <div className="flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm rounded-lg p-3">
                <Ruler className="w-5 h-5 text-white mb-1" />
                <p className="text-sm font-medium">{project.area} م²</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
