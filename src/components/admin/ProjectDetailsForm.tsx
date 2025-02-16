
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { projectDetailsSchema, type ProjectDetails, projectFeatureTypes } from "@/types/project";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectDetailsFormProps {
  projectId: string;
  initialData?: ProjectDetails;
}

export default function ProjectDetailsForm({ projectId, initialData }: ProjectDetailsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ProjectDetails>({
    resolver: zodResolver(projectDetailsSchema),
    defaultValues: initialData || {
      project_id: projectId,
      details: "",
      lat: undefined,
      lng: undefined,
      media: [],
      features: [],
    },
  });

  const onSubmit = async (data: ProjectDetails) => {
    setIsLoading(true);
    try {
      // First, upsert the project details
      const { error: detailsError } = await supabase
        .from('project_details')
        .upsert({
          project_id: data.project_id,
          details: data.details,
          lat: data.lat,
          lng: data.lng,
        });

      if (detailsError) throw detailsError;

      // Handle media
      if (data.media.length > 0) {
        const { error: mediaError } = await supabase
          .from('project_media')
          .upsert(
            data.media.map(media => ({
              ...media,
              project_id: data.project_id,
            }))
          );
        
        if (mediaError) throw mediaError;
      }

      // Handle features
      if (data.features.length > 0) {
        const { error: featuresError } = await supabase
          .from('project_features')
          .upsert(
            data.features.map(feature => ({
              ...feature,
              project_id: data.project_id,
            }))
          );
        
        if (featuresError) throw featuresError;
      }

      toast({
        title: "تم الحفظ",
        description: "تم حفظ تفاصيل المشروع بنجاح",
      });

      navigate(`/project/${projectId}`);
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء حفظ تفاصيل المشروع",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تفاصيل المشروع</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isLoading}
                        placeholder="أدخل تفاصيل المشروع"
                        className="min-h-[200px] text-right"
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
                          onChange={e => onChange(parseFloat(e.target.value))}
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
                          onChange={e => onChange(parseFloat(e.target.value))}
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

              {/* Features Section */}
              <div className="space-y-4">
                <FormLabel>مميزات المشروع</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {projectFeatureTypes.map((featureType) => {
                    const existingFeature = form.watch('features').find(
                      f => f.feature_type === featureType
                    );
                    
                    return (
                      <div key={featureType} className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            {featureType}
                          </label>
                          <Input
                            type="number"
                            min="0"
                            className="w-20 text-left"
                            value={existingFeature?.amount || 0}
                            onChange={(e) => {
                              const amount = parseInt(e.target.value);
                              const features = form.getValues('features');
                              if (amount > 0) {
                                if (existingFeature) {
                                  existingFeature.amount = amount;
                                  form.setValue('features', [...features]);
                                } else {
                                  form.setValue('features', [
                                    ...features,
                                    { feature_type: featureType, amount }
                                  ]);
                                }
                              } else {
                                form.setValue(
                                  'features',
                                  features.filter(f => f.feature_type !== featureType)
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Media Upload Section */}
              {/* This will be implemented in the next iteration */}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin')}
            disabled={isLoading}
          >
            إلغاء
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            حفظ التفاصيل
          </Button>
        </div>
      </form>
    </Form>
  );
}
