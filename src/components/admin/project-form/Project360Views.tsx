
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProjectFormValues } from "@/types/project";
import { useState } from "react";
import { Info, Link } from "lucide-react";

interface Project360ViewsProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
}

export default function Project360Views({ form, isLoading }: Project360ViewsProps) {
  const views360 = form.watch("views360") || [];
  const [directUrl, setDirectUrl] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  const addView = () => {
    const currentViews = form.getValues("views360") || [];
    form.setValue("views360", [
      ...currentViews,
      { id: crypto.randomUUID(), title: "", url: "" }
    ], { shouldValidate: true });
    setJsonError(null);
  };

  const handleAddDirectUrl = () => {
    if (!directUrl) {
      setJsonError("الرجاء إدخال رابط الجولة");
      return;
    }

    try {
      // Add the direct URL as a new view with a default title
      const currentViews = form.getValues("views360") || [];
      form.setValue("views360", [
        ...currentViews,
        { 
          id: crypto.randomUUID(), 
          title: "جولة افتراضية " + (currentViews.length + 1), 
          url: directUrl 
        }
      ], { shouldValidate: true });
      
      // Clear the input field and any errors
      setDirectUrl("");
      setJsonError(null);
    } catch (error) {
      setJsonError("حدث خطأ في إضافة الرابط");
    }
  };

  const removeView = (index: number) => {
    const currentViews = form.getValues("views360") || [];
    form.setValue(
      "views360",
      currentViews.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
    setJsonError(null);
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
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-amber-500 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">كيفية إضافة جولة افتراضية:</p>
            <p>يمكنك إضافة رابط جولة افتراضية مباشرة في حقل "أضف رابط مباشر" أدناه ثم الضغط على "إضافة" أو يمكنك إضافة جولة بالتفاصيل عبر زر "إضافة جولة".</p>
            <p className="mt-1">الآن يتم حفظ جميع الروابط بتنسيق صحيح تلقائياً في قاعدة البيانات.</p>
          </div>
        </div>
      </div>

      {/* Direct URL input section */}
      <div className="p-4 border rounded-lg bg-gray-50">
        <FormLabel className="mb-2 block">أضف رابط مباشر</FormLabel>
        <div className="flex gap-2">
          <Input
            value={directUrl}
            onChange={(e) => setDirectUrl(e.target.value)}
            placeholder="أدخل رابط الجولة الافتراضية"
            disabled={isLoading}
          />
          <Button 
            type="button" 
            onClick={handleAddDirectUrl}
            disabled={isLoading || !directUrl}
          >
            إضافة
          </Button>
        </div>
        {jsonError && (
          <p className="text-sm text-red-500 mt-1">{jsonError}</p>
        )}
        <p className="text-xs text-gray-500 mt-2">مثال: https://my.matterport.com/show/?m=xCZqkXZqaX2</p>
      </div>

      {views360.length === 0 && (
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">لا توجد جولات افتراضية. استخدم أحد الخيارين لإضافة جولة جديدة.</p>
        </div>
      )}

      {views360.map((view, index) => (
        <div key={view.id || index} className="space-y-4 p-4 border rounded-lg">
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

          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeView(index)}
              disabled={isLoading}
            >
              حذف
            </Button>
            
            {view.url && (
              <a 
                href={view.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:underline"
              >
                <Link className="h-4 w-4 mr-1" />
                فتح الرابط
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
