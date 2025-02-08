
import { Card } from "../ui/card";
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
      className="cursor-pointer group w-[360px]"
      role="button"
      tabIndex={0}
    >
      <Card className="overflow-hidden bg-white rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02] h-[448px] flex flex-col">
        <div className="relative h-[180px] bg-gray-100">
          <img
            src={project.thumbnail_url}
            alt={project.name}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="high"
            onError={(e) => {
              console.error('Image failed to load:', project.thumbnail_url);
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <Badge 
            className={`absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}
          >
            {project.status}
          </Badge>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="text-right mb-4">
            <h3 className="text-xl font-bold text-darkBlue mb-2">
              {project.name}
            </h3>
            <p className="text-lg font-bold text-gold">
              {formatPrice(project.property_value)}
            </p>
          </div>

          <div className="text-right mb-4">
            <p className="text-sm text-gray-600 mb-1">
              {project.city}
            </p>
            <p className="text-sm text-gray-600">
              {project.district}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-auto">
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3">
              <Home className="w-5 h-5 text-darkBlue mb-1" />
              <p className="text-sm font-medium text-gray-600">{project.rooms} غرف</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3">
              <Bath className="w-5 h-5 text-darkBlue mb-1" />
              <p className="text-sm font-medium text-gray-600">{project.bathrooms} حمام</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3">
              <Ruler className="w-5 h-5 text-darkBlue mb-1" />
              <p className="text-sm font-medium text-gray-600">{project.area} م²</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;

