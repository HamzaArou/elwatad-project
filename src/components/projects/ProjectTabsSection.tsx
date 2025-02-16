
import { Building2, Info, MapPin, Bed, Bath, Square, User, Waves, Car, UserCheck, Sofa } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectLocation from "./ProjectLocation";
import { cn } from "@/lib/utils";

interface ProjectTabsSectionProps {
  details?: string | null;
  rooms?: number;
  bathrooms?: number;
  area?: number;
  features?: string[];
  location: string;
  lat?: number | null;
  lng?: number | null;
}

const FEATURE_ICONS: Record<string, any> = {
  "غرفة خادمة": <User className="w-5 h-5" />,
  "بها مصعد": <Building2 className="w-5 h-5" />,
  "بدون مسبح": <Waves className="w-5 h-5" />,
  "بدون جراج": <Car className="w-5 h-5" />,
  "موقف خاص": <Car className="w-5 h-5" />,
  "غرفة سائق": <UserCheck className="w-5 h-5" />,
  "غير مفروشة": <Sofa className="w-5 h-5" />
};

export default function ProjectTabsSection({
  details,
  rooms = 0,
  bathrooms = 0,
  area = 0,
  features = [],
  location,
  lat,
  lng
}: ProjectTabsSectionProps) {
  return <div className="relative py-8 md:py-16 bg-gray-100/50 rounded-3xl mb-12">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="details" className="w-full" dir="rtl">
          <TabsList className="bg-white rounded-xl w-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x rtl:divide-x-reverse overflow-hidden">
            <TabsTrigger 
              value="details" 
              className="flex-1 gap-3 px-4 py-4 text-base font-medium text-gray-600 transition-all duration-300 data-[state=active]:bg-[#2F4447] data-[state=active]:text-white hover:bg-gray-50"
            >
              <Info className="w-5 h-5" />
              تفاصيل
            </TabsTrigger>
            <TabsTrigger 
              value="features" 
              className="flex-1 gap-3 px-4 py-4 text-base font-medium text-gray-600 transition-all duration-300 data-[state=active]:bg-[#2F4447] data-[state=active]:text-white hover:bg-gray-50"
            >
              <Building2 className="w-5 h-5" />
              مكونات المشروع
            </TabsTrigger>
            <TabsTrigger 
              value="location" 
              className="flex-1 gap-3 px-4 py-4 text-base font-medium text-gray-600 transition-all duration-300 data-[state=active]:bg-[#2F4447] data-[state=active]:text-white hover:bg-gray-50"
            >
              <MapPin className="w-5 h-5" />
              الموقع والمجاورة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              {details ? <p className="text-lg leading-relaxed text-gray-700 text-right">{details}</p> : <p className="text-center text-gray-500 py-8">لا توجد تفاصيل متاحة</p>}
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Essential features */}
                <div className={cn("flex items-center gap-3 p-4 rounded-xl", "bg-gray-50 border border-gray-100")}>
                  <Square className="w-6 h-6 text-deepBlue" />
                  <span className="text-gray-700 text-lg">مساحة {area} م²</span>
                </div>

                <div className={cn("flex items-center gap-3 p-4 rounded-xl", "bg-gray-50 border border-gray-100")}>
                  <Bed className="w-6 h-6 text-deepBlue" />
                  <span className="text-gray-700 text-lg">غرف ({rooms})</span>
                </div>
                
                <div className={cn("flex items-center gap-3 p-4 rounded-xl", "bg-gray-50 border border-gray-100")}>
                  <Bath className="w-6 h-6 text-deepBlue" />
                  <span className="text-gray-700 text-lg">حمام ({bathrooms})</span>
                </div>

                {/* Additional features */}
                {features.map((feature, index) => (
                  <div key={index} className={cn("flex items-center gap-3 p-4 rounded-xl", "bg-gray-50 border border-gray-100")}>
                    {FEATURE_ICONS[feature] || <Building2 className="w-6 h-6 text-deepBlue" />}
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="location" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <ProjectLocation location={location} lat={lat} lng={lng} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}
