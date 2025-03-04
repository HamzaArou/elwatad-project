
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import ProjectStatusCard from "./unit-updates/ProjectStatusCard";

interface ProjectUpdatesProps {
  projectId: string;
}

export default function ProjectUpdates({ projectId }: ProjectUpdatesProps) {
  const { data: project, isLoading } = useQuery({
    queryKey: ['project-status', projectId],
    queryFn: async () => {
      console.log('Fetching project status for:', projectId);
      const { data, error } = await supabase
        .from('projects')
        .select('status')
        .eq('id', projectId)
        .single();

      if (error) {
        console.error('Error fetching project status:', error);
        throw error;
      }

      console.log('Fetched project status:', data);
      return data;
    },
  });

  // Default to "متاح" if no status is found
  const projectStatus = project?.status || "متاح";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-darkBlue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center py-8">
        <ProjectStatusCard status={projectStatus} />
      </div>
      
      <div className="text-center p-8 rounded-lg border border-dashed border-gray-300">
        <h3 className="text-xl font-medium text-gray-500">
          لا توجد وحدات متاحة حالياً
        </h3>
      </div>
    </div>
  );
}
