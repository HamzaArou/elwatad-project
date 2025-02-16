
import { 
  Building2, 
  Info, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  User, 
  Waves, 
  Car, 
  UserCheck,
  Sofa
} from "lucide-react";
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
}

const FEATURE_ICONS: Record<string, any> = {
  "غرفة خادمة": <User className="w-5 h-5" />,
  "بها مصعد": <Building2 className="w-5 h-5" />,
  "بدون مسبح": <Waves className="w-5 h-5" />,
  "بدون جراج": <Car className="w-5 h-5" />,
  "موقف خاص": <Car className="w-5 h-5" />,
  "غرفة سائق": <UserCheck className="w-5 h-5" />,
  "غير مفروشة": <Sofa className="w-5 h-5" />,
};

export default function ProjectTabsSection({ 
  details, 
  rooms = 0, 
  bathrooms = 0, 
  area = 0, 
  features = [],
  location 
}: ProjectTabsSectionProps) {
  return (
    <div className="relative py-16 bg-gradient-to-b from-deepBlue/10 to-deepBlue/5 rounded-3xl mb-12">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="details" className="w-full" dir="rtl">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="details" className="gap-2">
                <Info className="w-4 h-4" />
                تفاصيل
              </TabsTrigger>
              <TabsTrigger value="features" className="gap-2">
                <Building2 className="w-4 h-4" />
                مكونات المشروع
              </TabsTrigger>
              <TabsTrigger value="location" className="gap-2">
                <MapPin className="w-4 h-4" />
                الموقع والمجاورة
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="mt-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-3xl mx-auto">
              {details ? (
                <p className="text-lg leading-relaxed text-gray-700 text-right">{details}</p>
              ) : (
                <p className="text-center text-gray-500">لا توجد تفاصيل متاحة</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-3xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Essential features */}
                <div className={cn(
                  "flex items-center gap-3 p-3 rounded-lg",
                  "bg-white/80 shadow-sm border border-gray-100"
                )}>
                  <Square className="w-5 h-5 text-deepBlue" />
                  <span className="text-gray-700">مساحة {area} م²</span>
                </div>

                <div className={cn(
                  "flex items-center gap-3 p-3 rounded-lg",
                  "bg-white/80 shadow-sm border border-gray-100"
                )}>
                  <Bed className="w-5 h-5 text-deepBlue" />
                  <span className="text-gray-700">غرف ({rooms})</span>
                </div>
                
                <div className={cn(
                  "flex items-center gap-3 p-3 rounded-lg",
                  "bg-white/80 shadow-sm border border-gray-100"
                )}>
                  <Bath className="w-5 h-5 text-deepBlue" />
                  <span className="text-gray-700">حمام ({bathrooms})</span>
                </div>

                {/* Additional features */}
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg",
                      "bg-white/80 shadow-sm border border-gray-100"
                    )}
                  >
                    {FEATURE_ICONS[feature] || <Building2 className="w-5 h-5 text-deepBlue" />}
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="location" className="mt-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-3xl mx-auto">
              <ProjectLocation location={location} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
