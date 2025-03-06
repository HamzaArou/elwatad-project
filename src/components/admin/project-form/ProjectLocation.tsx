
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import Script from "@/components/ui/script";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectLocationProps {
  form: UseFormReturn<ProjectFormValues>;
  isLoading: boolean;
}

export default function ProjectLocation({ form, isLoading }: ProjectLocationProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (scriptLoaded && inputRef.current) {
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "sa" },
        types: ["address"],
      });

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.formatted_address) {
          form.setValue("address", place.formatted_address);
          if (place.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            console.log("Setting coordinates from autocomplete:", lat, lng);
            form.setValue("lat", lat);
            form.setValue("lng", lng);
          }
          handleAddressChange(place.formatted_address);
        }
      });
    }
  }, [scriptLoaded, form]);

  const handleAddressChange = (address: string) => {
    form.setValue("address", address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address + ", Saudi Arabia"
    )}`;
    setPreviewUrl(googleMapsUrl);
  };

  // Log the current lat/lng values when they change
  useEffect(() => {
    const lat = form.watch("lat");
    const lng = form.watch("lng");
    if (lat && lng) {
      console.log("Current lat/lng in form:", lat, lng);
    }
  }, [form.watch("lat"), form.watch("lng")]);

  return (
    <div className="space-y-4">
      <Script
        src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDAVuXJckyiKNxO9PFVUXjrOJ1-BGE_-JA"
        onLoad={() => setScriptLoaded(true)}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>عنوان المشروع</FormLabel>
            <FormControl>
              <Input
                {...field}
                ref={inputRef}
                disabled={isLoading}
                onChange={(e) => {
                  field.onChange(e);
                  handleAddressChange(e.target.value);
                }}
                placeholder="أدخل عنوان المشروع (مثال: حي النرجس، الرياض)"
                className="text-right"
                dir="rtl"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="lat"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>خط العرض (Latitude)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="any"
                  value={value || ''}
                  onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    console.log("Setting lat to:", newValue);
                    onChange(newValue);
                  }}
                  disabled={isLoading}
                  placeholder="21.4225"
                  className="text-left ltr"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lng"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>خط الطول (Longitude)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="any"
                  value={value || ''}
                  onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    console.log("Setting lng to:", newValue);
                    onChange(newValue);
                  }}
                  disabled={isLoading}
                  placeholder="39.8256"
                  className="text-left ltr"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الرمز البريدي</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  placeholder="21955"
                  className="text-right"
                  dir="rtl"
                  maxLength={5}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500">أدخل الرمز البريدي بدلاً من الإحداثيات لتحديد المنطقة</p>
            </FormItem>
          )}
        />
      </div>

      {/* Add the project status selection field */}
      <FormField
        control={form.control}
        name="projectStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>حالة المشروع</FormLabel>
            <Select
              disabled={isLoading}
              onValueChange={field.onChange}
              defaultValue={field.value || "متاح"}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر حالة المشروع" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="متاح">متاح</SelectItem>
                <SelectItem value="محجوز">محجوز</SelectItem>
                <SelectItem value="مباع">مباع</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {previewUrl && (
        <div className="mt-4">
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <MapPin className="h-4 w-4" />
            عرض الموقع على خريطة جوجل
          </a>
        </div>
      )}
    </div>
  );
}
