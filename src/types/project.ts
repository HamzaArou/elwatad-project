
import { z } from "zod";

export const projectFeatureTypes = [
  'غرفة خادمة',
  'بها مصعد',
  'بدون مسبح',
  'بدون جراج',
  'موقف خاص',
  'غرفة سائق',
  'غير مفروشة',
  'مطبخ مجهز',
  'تكييف مركزي',
  'خزان مياه'
] as const;

export type ProjectFeatureType = typeof projectFeatureTypes[number];

export const projectMediaSchema = z.object({
  id: z.string().optional(),
  media_url: z.string().url("الرجاء إدخال رابط صحيح"),
  media_type: z.enum(["image", "video"]),
  display_order: z.number(),
});

export const projectFeatureSchema = z.object({
  id: z.string().optional(),
  feature_type: z.enum(projectFeatureTypes),
  amount: z.number().min(1, "يجب أن تكون الكمية أكبر من 0"),
});

export const projectDetailsSchema = z.object({
  project_id: z.string(),
  details: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  media: z.array(projectMediaSchema),
  features: z.array(projectFeatureSchema),
});

export type ProjectMedia = z.infer<typeof projectMediaSchema>;
export type ProjectFeature = z.infer<typeof projectFeatureSchema>;
export type ProjectDetails = z.infer<typeof projectDetailsSchema>;

export const view360Schema = z.object({
  title: z.string().min(1, "عنوان الجولة مطلوب"),
  url: z.string().url("الرجاء إدخال رابط صحيح")
});

export type ProjectUnit = {
  id: string;
  unit_number: number;
  name: string;
  status: string;
  unit_type: string;
  area: number;
  floor_number: number;
  side: string;
  rooms: number;
  bathrooms: number;
  details?: {
    features?: string[];
    guarantees?: string[];
    specifications?: string[];
  };
};

export const cityTypes = ["مدينة مكة", "مدينة جدة"] as const;
export type CityType = typeof cityTypes[number];

export const projectFormSchema = z.object({
  name: z.string().min(1, "اسم المشروع مطلوب"),
  city: z.enum(cityTypes, {
    errorMap: () => ({ message: "المدينة مطلوبة" }),
  }),
  location: z.string().min(1, "الموقع مطلوب"),
  address: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  floors: z.number().min(1, "عدد الطوابق يجب أن يكون أكبر من 0"),
  units: z.number().min(1, "عدد الشقق يجب أن يكون أكبر من 0"),
  status: z.enum(["بدأ البيع", "تم البيع بالكامل", "قريباً"] as const),
  thumbnail_url: z.string().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  specifications: z.array(z.string()).optional(),
  plans: z.array(z.string()).optional(),
  project_units: z.array(z.object({
    id: z.string(),
    unit_number: z.number().min(1, "رقم الوحدة مطلوب"),
    name: z.string().min(1, "اسم الوحدة مطلوب"),
    status: z.string().min(1, "حالة الوحدة مطلوبة"),
    unit_type: z.string().min(1, "نوع الوحدة مطلوب"),
    area: z.number().min(1, "المساحة مطلوبة"),
    floor_number: z.number().min(0, "رقم الطابق مطلوب"),
    side: z.string().min(1, "الجهة مطلوبة"),
    rooms: z.number().min(1, "عدد الغرف مطلوب"),
    bathrooms: z.number().min(1, "عدد دورات المياه مطلوب"),
    details: z.object({
      features: z.array(z.string()).optional(),
      guarantees: z.array(z.string()).optional(),
      specifications: z.array(z.string()).optional(),
    }).optional(),
  })),
  gallery_type: z.enum(["images", "coming_soon"]),
  gallery_images: z.any().optional(),
  views360: z.array(view360Schema).optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

export interface ProjectFormProps {
  initialData?: ProjectFormValues & {
    id?: string;
    gallery_images?: { id: string; image_url: string }[];
  };
}

export type TabType = "basic" | "gallery" | "location" | "360views" | "units" | "plans";
