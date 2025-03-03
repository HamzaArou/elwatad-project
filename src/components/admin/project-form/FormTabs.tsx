
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TABS = ["basic", "gallery", "location", "360views", "units"] as const;
export type TabType = typeof TABS[number];

interface FormTabsProps {
  currentTab: TabType;
}

export default function FormTabs({ currentTab }: FormTabsProps) {
  return (
    <TabsList className="grid w-full grid-cols-5">
      <TabsTrigger value="basic">معلومات أساسية</TabsTrigger>
      <TabsTrigger value="gallery">صور المشروع</TabsTrigger>
      <TabsTrigger value="location">الموقع</TabsTrigger>
      <TabsTrigger value="360views">جولات افتراضية</TabsTrigger>
      <TabsTrigger value="units">الوحدات</TabsTrigger>
    </TabsList>
  );
}
