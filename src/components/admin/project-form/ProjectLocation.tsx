
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/types/project";
import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import Script from "@/components/ui/script";

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
            form.setValue("lat", place.geometry.location.lat());
            form.setValue("lng", place.geometry.location.lng());
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

  return (
    <div className="space-y-4">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`}
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

      <div className="grid grid-cols-2 gap-4">
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
                  onChange={(e) => onChange(parseFloat(e.target.value))}
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
                  onChange={(e) => onChange(parseFloat(e.target.value))}
                  disabled={isLoading}
                  placeholder="39.8256"
                  className="text-left ltr"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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
