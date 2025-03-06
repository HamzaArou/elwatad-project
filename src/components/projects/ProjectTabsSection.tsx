
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ProjectLocation from "./ProjectLocation";
import Project360Views from "./Project360Views";
import ProjectUnits from "./ProjectUnits";
import ProjectUpdates from "./ProjectUpdates";
import { Building2, Bed, Bath, Square } from "lucide-react";
import { useEffect } from "react";

interface ProjectTabsSectionProps {
  details: string;
  rooms: number;
  bathrooms: number;
  area: number;
  features: string[];
  location: string;
  lat?: number | null;
  lng?: number | null;
  postalCode?: string;
  projectId: string;
}

export default function ProjectTabsSection({
  details,
  rooms,
  bathrooms,
  area,
  features,
  location,
  lat,
  lng,
  postalCode,
  projectId
}: ProjectTabsSectionProps) {
  console.log("ProjectTabsSection received coordinates:", { lat, lng, postalCode });
  
  useEffect(() => {
    console.log("ProjectTabsSection coordinates updated:", { lat, lng, postalCode });
  }, [lat, lng, postalCode]);
  
  return <div className="mt-12 mb-16">
      <Tabs defaultValue="details" dir="rtl">
        <TabsList className="w-full justify-start mb-6 bg-transparent border-b border-gray-200 p-0 h-auto overflow-x-auto no-scrollbar">
          <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 py-3 text-base">
            التفاصيل
          </TabsTrigger>
          <TabsTrigger value="location" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 py-3 text-base">
            الموقع
          </TabsTrigger>
          <TabsTrigger value="360views" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 py-3 text-base">
            جولة 360
          </TabsTrigger>
          <TabsTrigger value="updates" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 py-3 text-base">
            تحديثات المشروع
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="pt-2">
          <Card className="bg-white p-6 rounded-lg shadow-sm border-0">
            <h3 className="text-xl font-semibold mb-6">نظرة عامة</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Square className="h-5 w-5 text-[#B69665]" />
                <div>
                  <div className="text-sm text-gray-500">المساحة</div>
                  <div className="font-semibold">{area} م²</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bed className="h-5 w-5 text-[#B69665]" />
                <div>
                  <div className="text-sm text-gray-500">غرف النوم</div>
                  <div className="font-semibold">{rooms}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bath className="h-5 w-5 text-[#B69665]" />
                <div>
                  <div className="text-sm text-gray-500">الحمامات</div>
                  <div className="font-semibold">{bathrooms}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-[#B69665]" />
                <div>
                  <div className="text-sm text-gray-500">النوع</div>
                  <div className="font-semibold">شقة</div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">وصف المشروع</h3>
            <div className="mb-8 text-gray-600 whitespace-pre-line">{details}</div>

            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {features.map((feature, index) => <div key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#B69665]"></div>
                  <div className="text-gray-600">{feature}</div>
                </div>)}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="pt-2 relative">
          <Card className="bg-white p-6 rounded-lg shadow-sm border-0 relative z-0 overflow-hidden">
            <ProjectLocation 
              location={location} 
              lat={lat} 
              lng={lng} 
              postalCode={postalCode}
            />
          </Card>
        </TabsContent>

        <TabsContent value="360views" className="pt-2">
          <Card className="bg-white p-6 rounded-lg shadow-sm border-0">
            <Project360Views projectId={projectId} />
          </Card>
        </TabsContent>

        <TabsContent value="updates" className="pt-2">
          <Card className="bg-white p-6 rounded-lg shadow-sm border-0">
            <ProjectUpdates projectId={projectId} />
          </Card>
        </TabsContent>
      </Tabs>
      
      <style>{`
        /* Ensure the map stays within its container */
        .leaflet-map-pane,
        .leaflet-tile,
        .leaflet-marker-icon,
        .leaflet-marker-shadow,
        .leaflet-tile-pane,
        .leaflet-overlay-pane,
        .leaflet-shadow-pane,
        .leaflet-marker-pane,
        .leaflet-popup-pane,
        .leaflet-overlay-pane svg,
        .leaflet-zoom-box,
        .leaflet-image-layer,
        .leaflet-layer {
          position: absolute;
          z-index: 1 !important;
        }
        
        /* Make sure controls are visible but don't overlap other content */
        .leaflet-control {
          z-index: 2 !important;
          position: relative;
        }
        
        /* Fix for popup layers */
        .leaflet-popup {
          z-index: 3 !important;
        }
      `}</style>
    </div>;
}
