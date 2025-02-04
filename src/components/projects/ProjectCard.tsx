
import { Card } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { useCallback, memo } from "react";
import { Badge } from "../ui/badge";

interface Project {
  id: string;
  name: string;
  location: string;
  status: string;
  floors: number;
  units: number;
  thumbnail_url: string;
  price?: number;
  price_single_street?: number;
  price_roof?: number;
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
  return `ريال ${price.toLocaleString('en-US')}`;
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

        <div className="p-4 flex flex-col flex-grow">
          <div className="text-right mb-3">
            <h3 className="text-lg font-bold text-darkBlue">
              {project.name}
            </h3>
            <p className="text-sm text-gray-600">
              مدينة مكة - {project.location}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="text-base font-bold text-darkBlue">{project.floors}</p>
              <p className="text-sm text-gray-600">الطوابق</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="text-base font-bold text-darkBlue">{project.units}</p>
              <p className="text-sm text-gray-600">الشقق</p>
            </div>
          </div>

          <div className="mt-auto">
            <p className="text-sm font-medium text-gray-600 mb-2 text-center">السعر</p>
            <div className="space-y-1 text-right">
              <p className="text-base font-bold text-gold">
                على واجهة: {formatPrice(750000)}
              </p>
              <p className="text-base font-bold text-gold">
                على واجهتين: {formatPrice(800000)}
              </p>
              <p className="text-base font-bold text-gold">
                روف: {formatPrice(1400000)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
