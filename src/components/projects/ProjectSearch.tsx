
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProjectSearchProps {
  onFilterChange: (neighborhood: string, status: string) => void;
}

const ProjectSearch = ({ onFilterChange }: ProjectSearchProps) => {
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*');
      if (error) throw error;
      return data || [];
    },
  });

  const uniqueNeighborhoods = useMemo(() => {
    return Array.from(
      new Set(projects.map(project => project.location))
    ).sort();
  }, [projects]);

  const handleNeighborhoodChange = (value: string) => {
    onFilterChange(value, "all");
  };

  const handleStatusChange = (value: string) => {
    onFilterChange("all", value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-darkBlue rounded-2xl md:rounded-full px-4 md:px-8 w-full max-w-[462px] py-4 md:h-[54px] mb-4 mx-auto gap-3 md:gap-4">
      <span className="text-white text-lg md:text-xl font-semibold order-first md:order-last whitespace-nowrap">
        ابحث عن وحدتك
      </span>
      
      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <Select onValueChange={handleNeighborhoodChange}>
          <SelectTrigger className="w-full md:w-[140px] bg-white rounded-2xl md:rounded-full h-[40px] border-none text-right">
            <SelectValue placeholder="اسم الحي" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأحياء</SelectItem>
            {uniqueNeighborhoods.map((neighborhood) => (
              <SelectItem key={neighborhood} value={neighborhood}>
                {neighborhood}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full md:w-[140px] bg-white rounded-2xl md:rounded-full h-[40px] border-none text-right">
            <SelectValue placeholder="نوع الوحدة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="فيلا">فيلا</SelectItem>
            <SelectItem value="شقة">شقة</SelectItem>
            <SelectItem value="روف">روف</SelectItem>
            <SelectItem value="أرض">أرض</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProjectSearch;
