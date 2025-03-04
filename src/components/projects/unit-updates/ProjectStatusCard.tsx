
import { cn } from "@/lib/utils";
import { memo } from "react";
import { getStatusColor } from "./utils";
import { Check, Clock, Building } from "lucide-react";

interface ProjectStatusCardProps {
  status: string;
}

const ProjectStatusCard = memo(({ status }: ProjectStatusCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'متاح':
        return <Building className="w-10 h-10 mb-3" />;
      case 'محجوز':
        return <Clock className="w-10 h-10 mb-3" />;
      case 'مباع':
        return <Check className="w-10 h-10 mb-3" />;
      default:
        return <Building className="w-10 h-10 mb-3" />;
    }
  };

  const getStatusDescription = () => {
    switch (status) {
      case 'متاح':
        return 'هذا المشروع متاح للشراء حالياً';
      case 'محجوز':
        return 'تم حجز هذا المشروع مؤقتاً';
      case 'مباع':
        return 'تم بيع هذا المشروع بالكامل';
      default:
        return 'هذا المشروع متاح للشراء حالياً';
    }
  };
  
  const colorClasses = getStatusColor(status);
  
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center p-8 rounded-xl w-full max-w-md text-center shadow-lg transition-all duration-300",
        colorClasses,
        status === 'متاح' ? "bg-gray-100" : "",
        status === 'محجوز' ? "bg-warmBeige/40" : "",
        status === 'مباع' ? "bg-darkBlue/10" : ""
      )}
    >
      <div className={cn(
        "rounded-full p-4 mb-2",
        status === 'متاح' ? "text-gray-600" : "",
        status === 'محجوز' ? "text-[#C6A567]" : "",
        status === 'مباع' ? "text-darkBlue" : ""
      )}>
        {getStatusIcon()}
      </div>
      
      <h2 className="text-3xl font-bold mb-2">{status}</h2>
      <p className="text-gray-600 text-lg">{getStatusDescription()}</p>
    </div>
  );
});

ProjectStatusCard.displayName = 'ProjectStatusCard';
export default ProjectStatusCard;
