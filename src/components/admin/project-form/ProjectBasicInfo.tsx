import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";

interface ProjectBasicInfoProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
}

export default function ProjectBasicInfo({ form, isLoading }: ProjectBasicInfoProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-gold text-lg">مشروع</p>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  {...field} 
                  disabled={isLoading} 
                  placeholder="أدخل اسم المشروع" 
                  className="text-3xl font-bold text-center text-gold"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الموقع</FormLabel>
            <FormControl>
              <Input {...field} disabled={isLoading} placeholder="أدخل موقع المشروع" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="floors"
        render={({ field }) => (
          <FormItem>
            <FormLabel>عدد الأدوار</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="1"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                disabled={isLoading}
                placeholder="أدخل عدد الأدوار"
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
                min="1"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                disabled={isLoading}
                placeholder="أدخل عدد الشقق"
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
            <FormLabel>حالة المشروع</FormLabel>
            <Select
              disabled={isLoading}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="اختر حالة المشروع" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="للبيع">للبيع</SelectItem>
                <SelectItem value="قريباً">قريباً</SelectItem>
                <SelectItem value="مكتمل">مكتمل</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}