import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProjectTabsSection from "@/components/projects/ProjectTabsSection";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { Building2, Bed, Bath, Square, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string; }>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const stickyRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const {
    data: projectData,
    isLoading: isLoadingProject
  } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) throw new Error("No project ID provided");
      const {
        data: project,
        error: projectError
      } = await supabase.from("projects").select(`
          id,
          name,
          location,
          district,
          property_status,
          property_value,
          rooms,
          bathrooms,
          area,
          thumbnail_url
        `).eq("id", id).single();
      if (projectError) throw projectError;
      const {
        data: details,
        error: detailsError
      } = await supabase.from("project_details").select("*").eq("project_id", id).single();
      if (detailsError && detailsError.code !== 'PGRST116') throw detailsError;
      const {
        data: media,
        error: mediaError
      } = await supabase.from("project_media").select("*").eq("project_id", id).order("display_order");
      if (mediaError) throw mediaError;
      const {
        data: features,
        error: featuresError
      } = await supabase.from("project_features").select("*").eq("project_id", id);
      if (featuresError) throw featuresError;
      return {
        ...project,
        details: details?.details,
        lat: details?.lat,
        lng: details?.lng,
        media: media || [],
        features: features || []
      };
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { 
        threshold: 0,
        rootMargin: "0px" 
      }
    );

    if (stickyRef.current) {
      observer.observe(stickyRef.current);
    }
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم الجوال",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: 'service_vsb08u9',
          template_id: 'template_31x8lw5',
          user_id: 'DJX_dy28zAjctAAIj',
          template_params: {
            to_email: 'pr@wtd.com.sa',
            from_name: formData.name,
            phone_number: formData.phone,
            project: projectData?.name,
            message: formData.message || 'No message provided'
          }
        })
      });
      if (!response.ok) {
        throw new Error(`EmailJS error: ${response.status} ${await response.text()}`);
      }
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سنقوم بالتواصل معك قريباً"
      });
      setDialogOpen(false);
      setFormData({
        name: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "حدث خطأ",
        description: "الرجاء المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingProject) {
    return <div>Loading...</div>;
  }
  if (!projectData) {
    return <div>Project not found</div>;
  }

  const galleryItems = projectData.media.map(item => ({
    id: item.id,
    url: item.media_url,
    type: item.media_type as 'image' | 'video',
    content_type: 'gallery'
  }));

  const formatPrice = (price?: number) => {
    if (!price) return "السعر عند الطلب";
    return `${price.toLocaleString('ar-SA')} ريال`;
  };

  return <div className="min-h-screen bg-gray-50">
      {/* Project Card Section */}
      <div className="pt-[140px] pb-8">
        <div className="max-w-[400px] mx-auto px-4">
          <Card className="overflow-hidden rounded-[24px] shadow-lg">
            <div className="relative h-[400px]">
              <img src={projectData.thumbnail_url} alt={projectData.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex justify-between items-end">
                  <div className="text-right">
                    <h1 className="text-3xl font-bold mb-2 text-slate-50">{projectData.name}</h1>
                    <p className="text-lg opacity-90">{projectData.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 p-6 bg-white">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Square className="w-5 h-5 text-deepBlue" />
                <div>
                  <div className="text-sm text-gray-600">المساحة</div>
                  <div className="font-semibold">{projectData.area} م²</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Bed className="w-5 h-5 text-deepBlue" />
                <div>
                  <div className="text-sm text-gray-600">غرف النوم</div>
                  <div className="font-semibold">{projectData.rooms}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Bath className="w-5 h-5 text-deepBlue" />
                <div>
                  <div className="text-sm text-gray-600">الحمامات</div>
                  <div className="font-semibold">{projectData.bathrooms}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Building2 className="w-5 h-5 text-deepBlue" />
                <div>
                  <div className="text-sm text-gray-600">المنطقة</div>
                  <div className="font-semibold">{projectData.district}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto px-4 py-8">
        <ProjectGallery gallery={galleryItems} />
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 pb-12">
        <ProjectTabsSection 
          details={projectData.details} 
          rooms={projectData.rooms} 
          bathrooms={projectData.bathrooms} 
          area={projectData.area} 
          features={projectData.features.map(f => `${f.feature_type} (${f.amount})`)} 
          location={projectData.location || ""} 
          lat={projectData.lat} 
          lng={projectData.lng} 
        />
      </div>

      {/* Last section that will trigger the observer */}
      <div ref={stickyRef} className="h-32 bg-transparent" />

      {/* Application Bar */}
      <div className={`${isSticky ? 'fixed' : 'relative'} bottom-0 left-0 right-0 z-50 bg-[#222222]`}>
        <div className="py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Button 
              onClick={() => setDialogOpen(true)}
              className="bg-[#B69665] hover:bg-[#B69665]/90 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
            >
              قدم الآن
              <ArrowUpRight className="h-5 w-5" />
            </Button>
            <h3 className="text-white text-xl font-bold">
              سارع بتقديم طلبك الآن
            </h3>
          </div>
        </div>
      </div>

      {/* Application Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">
              سجل اهتمامك بهذا المشروع
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="الاسم الكامل *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 text-right"
                required
              />
            </div>
            
            <div className="phone-input-container">
              <PhoneInput
                country={'sa'}
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                inputClass="!w-full !px-4 !py-3 !rounded-lg !bg-gray-100 !border-0 !text-right"
                containerClass="!w-full !dir-ltr"
                buttonClass="!bg-gray-100 !border-0 !rounded-lg !left-0 !right-auto"
                dropdownClass="!bg-white !left-0 !right-auto"
                enableSearch={false}
                disableSearchIcon
                inputProps={{
                  required: true,
                  placeholder: "رقم الجوال *",
                }}
              />
            </div>

            <div>
              <textarea
                placeholder="الطلب"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 text-right min-h-[120px] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-lg bg-[#222222] text-white font-semibold hover:bg-[#222222]/90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "جاري الإرسال..." : "إرسال"}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <style>{`
        .phone-input-container .react-tel-input .form-control {
          text-align: right;
          padding-left: 48px !important;
          padding-right: 16px !important;
          direction: ltr;
        }
        .phone-input-container .react-tel-input .flag-dropdown {
          border: none !important;
          background: transparent !important;
          left: 0 !important;
          right: auto !important;
        }
        .phone-input-container .react-tel-input .selected-flag {
          background: transparent !important;
          padding-left: 8px !important;
        }
        .phone-input-container .react-tel-input .country-list {
          left: 0 !important;
          right: auto !important;
        }
      `}</style>
    </div>;
}
