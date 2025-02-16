
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "../ui/slider";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { SlidersHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export interface SearchFilters {
  city: string;
  district: string;
  propertyType: string;
  rooms: number | null;
  bathrooms: number | null;
  areaRange: [number, number];
  valueRange: [number, number];
}

interface ProjectSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

const ProjectSearch = ({ onSearch }: ProjectSearchProps) => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [roomCount, setRoomCount] = useState<number | null>(null);
  const [bathroomCount, setBathroomCount] = useState<number | null>(null);
  const [district, setDistrict] = useState("");
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 1000]);
  const [valueRange, setValueRange] = useState<[number, number]>([0, 10000000]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const cities = ["جدة", "مكه"];
  const propertyTypes = ["فيلا", "شقة", "روف", "أرض"];
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);

  const handleSearch = () => {
    onSearch({
      city: selectedCity,
      district,
      propertyType: selectedType,
      rooms: roomCount,
      bathrooms: bathroomCount,
      areaRange,
      valueRange
    });
    setDialogOpen(false);
  };

  return (
    <div className="flex justify-end w-full">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button className="p-2 hover:bg-gray-100 transition-colors py-[26px] rounded-2xl px-[12px] mx-[7px]">
            <SlidersHorizontal className="h-6 w-6" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#1C1C1C] text-white p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="space-y-6 text-right">
            {/* City Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-slate-50">مدينة العقار</h3>
              <div className="grid grid-cols-3 gap-3">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={cn(
                      "py-2 px-4 rounded-full border border-white/20 transition-colors",
                      selectedCity === city ? "bg-white text-black" : "hover:bg-white/10"
                    )}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* District Input */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-50">المنطقة</h3>
              <Input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="بحث..."
                className="bg-transparent border-white/20 text-white placeholder:text-white/50"
                dir="rtl"
              />
            </div>

            {/* Property Type */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-50">نوع العقار</h3>
              <div className="grid grid-cols-2 gap-3">
                {propertyTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      "py-2 px-4 rounded-full border border-white/20 transition-colors",
                      selectedType === type ? "bg-white text-black" : "hover:bg-white/10"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Count */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-50">عدد الغرف</h3>
              <div className="grid grid-cols-5 gap-3">
                {numbers.map(num => (
                  <button
                    key={num}
                    onClick={() => setRoomCount(num)}
                    className={cn(
                      "py-2 px-4 rounded-full border border-white/20 transition-colors",
                      roomCount === num ? "bg-white text-black" : "hover:bg-white/10"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Bathroom Count */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-50">عدد الحمامات</h3>
              <div className="grid grid-cols-5 gap-3">
                {numbers.map(num => (
                  <button
                    key={num}
                    onClick={() => setBathroomCount(num)}
                    className={cn(
                      "py-2 px-4 rounded-full border border-white/20 transition-colors",
                      bathroomCount === num ? "bg-white text-black" : "hover:bg-white/10"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Area Range */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-50">مساحة العقار</h3>
              <div className="space-y-4">
                <div className="flex justify-between gap-4 text-sm">
                  <div className="flex-1">
                    <span className="block mb-2">من</span>
                    <Input
                      type="number"
                      value={areaRange[0]}
                      onChange={(e) => setAreaRange([Number(e.target.value), areaRange[1]])}
                      className="bg-transparent border-white/20 text-white"
                      dir="rtl"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="block mb-2">إلي</span>
                    <Input
                      type="number"
                      value={areaRange[1]}
                      onChange={(e) => setAreaRange([areaRange[0], Number(e.target.value)])}
                      className="bg-transparent border-white/20 text-white"
                      dir="rtl"
                    />
                  </div>
                </div>
                <Slider
                  value={areaRange}
                  onValueChange={(value) => setAreaRange(value as [number, number])}
                  min={0}
                  max={1000}
                  step={10}
                  className="mt-6"
                />
              </div>
            </div>

            {/* Property Value Range */}
            <div>
              <h3 className="font-semibold mb-3 text-lg text-gray-50">قيمة العقار</h3>
              <div className="space-y-4">
                <div className="flex justify-between gap-4 text-sm">
                  <div className="flex-1">
                    <span className="block mb-2">من</span>
                    <Input
                      type="number"
                      value={valueRange[0]}
                      onChange={(e) => setValueRange([Number(e.target.value), valueRange[1]])}
                      className="bg-transparent border-white/20 text-white"
                      dir="rtl"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="block mb-2">إلي</span>
                    <Input
                      type="number"
                      value={valueRange[1]}
                      onChange={(e) => setValueRange([valueRange[0], Number(e.target.value)])}
                      className="bg-transparent border-white/20 text-white"
                      dir="rtl"
                    />
                  </div>
                </div>
                <Slider
                  value={valueRange}
                  onValueChange={(value) => setValueRange(value as [number, number])}
                  min={0}
                  max={10000000}
                  step={100000}
                  className="mt-6"
                />
              </div>
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="w-full bg-white text-black hover:bg-white/90 py-6 text-lg font-semibold"
            >
              بحث
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectSearch;
