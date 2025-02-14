import { useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
interface ProjectSearchProps {
  onFilterChange: (neighborhood: string, status: string) => void;
}
const ProjectSearch = ({
  onFilterChange
}: ProjectSearchProps) => {
  const {
    data: projects = []
  } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('projects').select('*');
      if (error) throw error;
      return data || [];
    }
  });
  const uniqueNeighborhoods = useMemo(() => {
    return Array.from(new Set(projects.map(project => project.location))).sort();
  }, [projects]);
  const handleNeighborhoodChange = (value: string) => {
    onFilterChange(value, "all");
  };
  const handleStatusChange = (value: string) => {
    onFilterChange("all", value);
  };
  return;
};
export default ProjectSearch;