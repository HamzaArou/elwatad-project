
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Project360ViewsProps {
  projectId: string;
}

export default function Project360Views({ projectId }: Project360ViewsProps) {
  const [activeView, setActiveView] = useState<string | null>(null);

  const { data: views360, isLoading } = useQuery({
    queryKey: ["views360", projectId],
    queryFn: async () => {
      try {
        // First try to get from project_media table
        const { data, error } = await supabase
          .from("project_media")
          .select("id, media_url, media_type")
          .eq("project_id", projectId)
          .eq("media_type", "view360");

        if (error) throw error;
        
        // Return the array of views or empty array if none found
        return data || [];
      } catch (error) {
        console.error("Error fetching 360 views:", error);
        return [];
      }
    },
  });

  if (isLoading) {
    return <div className="text-center py-12">جاري تحميل الجولة...</div>;
  }

  if (!views360 || views360.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        لا يوجد جولة افتراضية متاحة لهذا المشروع حالياً
      </div>
    );
  }

  // Set first view as active if none selected
  if (!activeView && views360.length > 0) {
    setActiveView(views360[0].id);
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">جولة افتراضية 360°</h3>

      <Tabs value={activeView || undefined} onValueChange={setActiveView} className="w-full">
        <TabsList className="flex overflow-x-auto py-2 mb-4">
          {views360.map((view) => (
            <TabsTrigger
              key={view.id}
              value={view.id}
              className="px-4 py-2 text-sm whitespace-nowrap"
            >
              {view.id}
            </TabsTrigger>
          ))}
        </TabsList>

        {views360.map((view) => (
          <TabsContent key={view.id} value={view.id} className="pt-4">
            <Card className="overflow-hidden rounded-lg">
              <iframe
                title={`360 View ${view.id}`}
                src={view.media_url}
                className="w-full h-[500px] border-0"
                allowFullScreen
                loading="lazy"
              />
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
