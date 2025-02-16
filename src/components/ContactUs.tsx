import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProjectsMap from "./ProjectsMap";
const ContactUs = ({
  projectId,
  projectName
}: {
  projectId?: string;
  projectName?: string;
}) => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    selectedProject: projectId || ""
  });
  const {
    data: projects = []
  } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('projects').select('*');
      if (error) throw error;
      return data || [];
    }
  });

  // Update selected project when projectId prop changes
  useEffect(() => {
    if (projectId) {
      setFormData(prev => ({
        ...prev,
        selectedProject: projectId
      }));
    }
  }, [projectId]);
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
            project: projectName || (formData.selectedProject ? projects.find(p => p.id === formData.selectedProject)?.name : ''),
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
      setFormData({
        name: "",
        phone: "",
        message: "",
        selectedProject: projectId || ""
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
  return <section className="bg-offWhite px-0 py-[70px]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form Section with Title */}
          <div className="space-y-6 h-[600px] flex flex-col">
            <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665] mx-[74px]">
              {projectId ? "سجل اهتمامك بهذا المشروع" : "سجل اهتمامك"}
            </h2>
            <div className="bg-white shadow-lg p-8 flex-1 overflow-y-auto px-[30px] mx-0 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input type="text" placeholder="الاسم - Name" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className={cn("w-full px-4 py-3 rounded-lg bg-offWhite border-0", "placeholder:text-gray-400 focus:ring-2 focus:ring-gold", "transition duration-200 text-right")} required />
                </div>
                
                <div className="phone-input-container">
                  <PhoneInput country={'sa'} value={formData.phone} onChange={phone => setFormData({
                  ...formData,
                  phone
                })} inputClass="!w-full !px-4 !py-3 !rounded-lg !bg-offWhite !border-0 !text-right" containerClass="!w-full !dir-ltr" buttonClass="!bg-offWhite !border-0 !rounded-lg !left-0 !right-auto" dropdownClass="!bg-white !left-0 !right-auto" enableSearch={false} disableSearchIcon inputProps={{
                  required: true,
                  placeholder: "الجوال - Mobile*"
                }} />
                </div>

                {!projectId && <div>
                    <select value={formData.selectedProject} onChange={e => setFormData({
                  ...formData,
                  selectedProject: e.target.value
                })} className={cn("w-full px-4 py-3 rounded-lg bg-offWhite border-0", "text-gray-600 focus:ring-2 focus:ring-gold", "transition duration-200 text-right")}>
                      <option value="">اختر المشروع - Select Project</option>
                      {projects.map(project => <option key={project.id} value={project.id}>
                          {project.name} - {project.location}
                        </option>)}
                    </select>
                  </div>}

                <div>
                  <textarea placeholder="الطلب - Looking for" value={formData.message} onChange={e => setFormData({
                  ...formData,
                  message: e.target.value
                })} className={cn("w-full px-4 py-3 rounded-lg bg-offWhite border-0", "placeholder:text-gray-400 focus:ring-2 focus:ring-gold", "transition duration-200 text-right min-h-[120px] resize-none")} />
                </div>

                <button type="submit" disabled={isSubmitting} className={cn("w-full py-3 px-6 rounded-lg", "bg-gold text-white font-semibold", "hover:bg-gold/90 transition duration-200", "disabled:opacity-50 disabled:cursor-not-allowed")}>
                  {isSubmitting ? "جاري الإرسال..." : "Send - إرسال"}
                </button>
              </form>
            </div>
          </div>

          {/* Map Section with Title */}
          
        </div>
      </div>

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
    </section>;
};
export default ContactUs;