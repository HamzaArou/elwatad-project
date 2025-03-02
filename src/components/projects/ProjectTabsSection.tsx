import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectLocation from "./ProjectLocation";
import Project360Views from "./Project360Views";
import { ProjectUnits } from "./ProjectUnits";

interface ProjectTabsSectionProps {
  details?: string;
  rooms?: number;
  bathrooms?: number;
  area?: number;
  features?: string[];
  location: string;
  lat?: number | null;
  lng?: number | null;
  postalCode?: string | null;
  projectId: string;
}

interface ProjectUnitsProps {
  projectId: string; // Added projectId prop to match how it's used
}

export default function ProjectTabsSection({ 
  details, 
  rooms, 
  bathrooms, 
  area, 
  features = [],
  location,
  lat,
  lng,
  postalCode,
  projectId
}: ProjectTabsSectionProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="details">التفاصيل</TabsTrigger>
          <TabsTrigger value="location">الموقع</TabsTrigger>
          <TabsTrigger value="units">الوحدات</TabsTrigger>
          <TabsTrigger value="360">جولة 360</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">تفاصيل المشروع</h3>
            <p className="text-gray-600">{details || "لا توجد تفاصيل متاحة"}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold">الميزات</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {features.length > 0 ? (
                    features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))
                  ) : (
                    <li>لا توجد ميزات متاحة</li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold">معلومات إضافية</h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>عدد الغرف: {rooms || "غير محدد"}</li>
                  <li>عدد الحمامات: {bathrooms || "غير محدد"}</li>
                  <li>المساحة: {area || "غير محدد"} م²</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="location">
          <ProjectLocation 
            location={location} 
            lat={lat} 
            lng={lng}
            postalCode={postalCode}
          />
        </TabsContent>
        
        <TabsContent value="units">
          <ProjectUnits projectId={projectId} />
        </TabsContent>
        
        <TabsContent value="360">
          <Project360Views projectId={projectId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
