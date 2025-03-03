
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectFormValues, cityTypes } from "@/types/project";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

export function ProjectBasicInfo({ form }: { form: UseFormReturn<ProjectFormValues> }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم المشروع</FormLabel>
              <FormControl>
                <Input placeholder="أدخل اسم المشروع" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>المدينة</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر مدينة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cityTypes.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الموقع</FormLabel>
              <FormControl>
                <Input placeholder="أدخل الموقع" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العنوان</FormLabel>
              <FormControl>
                <Input placeholder="أدخل العنوان" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وصف المشروع</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="أدخل وصف المشروع"
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featuresDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وصف المميزات</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="أدخل وصف مميزات المشروع"
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="floors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عدد الطوابق</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="أدخل عدد الطوابق"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="units"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عدد الشقق</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="أدخل عدد الشقق"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الحالة</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر حالة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="بدأ البيع">بدأ البيع</SelectItem>
                  <SelectItem value="تم البيع بالكامل">تم البيع بالكامل</SelectItem>
                  <SelectItem value="قريباً">قريباً</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
