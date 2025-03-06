
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues, TabType } from "@/types/project";
import { useToast } from "@/hooks/use-toast";

export const useFormValidation = (
  form: UseFormReturn<ProjectFormValues>,
  thumbnail: File | null,
  initialData: any,
  galleryImages: FileList | null,
  plans: FileList | null
) => {
  const { toast } = useToast();

  const validateTab = async (currentTab: TabType) => {
    const values = form.getValues();
    let isValid = true;

    switch (currentTab) {
      case "basic":
        isValid = await form.trigger(["name", "location", "floors", "status"]);
        
        if (!thumbnail && !initialData?.thumbnail_url) {
          toast({
            title: "خطأ",
            description: "الرجاء اختيار صورة للمشروع",
            variant: "destructive",
          });
          return false;
        }
        break;

      case "gallery":
        isValid = await form.trigger("gallery_type");
        if (values.gallery_type === "images" && !galleryImages && !initialData?.gallery_images?.length) {
          toast({
            title: "خطأ",
            description: "الرجاء اختيار صور للمعرض",
            variant: "destructive",
          });
          return false;
        }
        break;

      case "location":
        isValid = await form.trigger("address");
        break;

      case "360views":
        // Validate each view has title and URL
        const views360 = form.getValues("views360") || [];
        if (views360.length === 0) {
          // Allow empty views, not required
          return true;
        }
        
        // Check if any view is missing title or URL
        const invalidViews = views360.filter(view => 
          !view || typeof view !== 'object' || !view.title || !view.url
        );
        
        if (invalidViews.length > 0) {
          toast({
            title: "خطأ",
            description: "يجب إدخال عنوان ورابط لكل جولة افتراضية",
            variant: "destructive",
          });
          return false;
        }
        
        isValid = true;
        break;

      case "units":
        const units = form.getValues("project_units");
        if (!units || units.length === 0) {
          toast({
            title: "خطأ",
            description: "الرجاء إضافة وحدة واحدة على الأقل",
            variant: "destructive",
          });
          return false;
        }
        isValid = await form.trigger("project_units");
        break;
    }

    if (!isValid) {
      toast({
        title: "خطأ",
        description: "الرجاء إكمال جميع الحقول المطلوبة",
        variant: "destructive",
      });
    }

    return isValid;
  };

  return { validateTab };
};
