
import { useState, useCallback } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ProjectSearchProps {
  onFilterChange: (neighborhood: string, status: string) => void;
}

const ProjectSearch = ({ onFilterChange }: ProjectSearchProps) => {
  const [neighborhood, setNeighborhood] = useState("all");
  const [status, setStatus] = useState("all");

  const handleSearch = useCallback(() => {
    onFilterChange(neighborhood, status);
  }, [neighborhood, status, onFilterChange]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <Input
        type="text"
        placeholder="ابحث عن حي..."
        value={neighborhood === "all" ? "" : neighborhood}
        onChange={(e) => setNeighborhood(e.target.value || "all")}
        className="flex-1"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-md p-2 flex-1"
      >
        <option value="all">جميع الأنواع</option>
        <option value="فيلا">فيلا</option>
        <option value="شقة">شقة</option>
        <option value="روف">روف</option>
        <option value="أرض">أرض</option>
      </select>
      <Button onClick={handleSearch} className="bg-[#B69665] hover:bg-[#B69665]/90">
        بحث
      </Button>
    </div>
  );
};

export default ProjectSearch;
