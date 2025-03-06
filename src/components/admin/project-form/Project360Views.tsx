
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProjectFormValues } from "@/types/project";

interface Project360ViewsProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
}

export default function Project360Views({ form, isLoading }: Project360ViewsProps) {
  const views360 = form.watch("views360") || [];

  const addView = () => {
    const currentViews = form.getValues("views360") || [];
    form.setValue("views360", [
      ...currentViews,
      { id: crypto.randomUUID(), title: "", url: "" }
    ], { shouldValidate: true });
  };

  const removeView = (index: number) => {
    const currentViews = form.getValues("views360") || [];
    form.setValue(
      "views360",
      currentViews.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">جولات افتراضية 360°</h3>
        <Button
          type="button"
          onClick={addView}
          disabled={isLoading}
        >
          إضافة جولة
        </Button>
      </div>

      {views360.length === 0 && (
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">لا توجد جولات افتراضية. اضغط على "إضافة جولة" لإضافة جولة جديدة.</p>
        </div>
      )}

      {views360.map((_, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <FormField
            control={form.control}
            name={`views360.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان الجولة</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} placeholder="أدخل عنوان الجولة" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`views360.${index}.url`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>رابط الجولة</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} placeholder="أدخل رابط الجولة" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="destructive"
            onClick={() => removeView(index)}
            disabled={isLoading}
          >
            حذف
          </Button>
        </div>
      ))}
    </div>
  );
}
