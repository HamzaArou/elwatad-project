
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";

interface ProjectPlansProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
  onPlansChange: (files: FileList | null) => void;
  initialPlans?: string[];
}

export default function ProjectPlans({ form, isLoading, onPlansChange, initialPlans }: ProjectPlansProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="plans"
        render={({ field }) => (
          <FormItem>
            <FormLabel>مخططات المشروع</FormLabel>
            <div className="space-y-4">
              {initialPlans?.map((plan, index) => (
                <div key={index} className="flex items-center gap-2">
                  <a
                    href={plan}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    المخطط {index + 1}
                  </a>
                </div>
              ))}
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,image/*"
                  multiple
                  onChange={(e) => {
                    onPlansChange(e.target.files);
                    field.onChange(e.target.files ? Array.from(e.target.files as unknown as File[]) : []);
                  }}
                  disabled={isLoading}
                  className="cursor-pointer"
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
