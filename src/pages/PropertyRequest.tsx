
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PhoneInput from "react-phone-input-2";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, MapPin, Phone, User } from "lucide-react";
import "react-phone-input-2/lib/style.css";

const PropertyRequest = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "جدة",
    property_type: "فيلا"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('property_requests')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "تم إرسال طلبك بنجاح",
        description: "سنتواصل معك في أقرب وقت ممكن"
      });

      setFormData({
        name: "",
        phone: "",
        city: "جدة",
        property_type: "فيلا"
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-[#2F4447]">
        <div className="relative z-10 text-center text-white container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">اطلب عقارك الآن</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
            فريق وتد الكيان العقارية ملتزم بتقديم تشكيلة مختارة من أرقى العقارات التي تنسجم مع تطلعاتك وتلبي كل احتياجاتك
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">معلومات أساسية</h2>
                    <div className="h-1 flex-grow mx-4 bg-gradient-to-r from-gold/20 to-gold"></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-right block text-lg">
                        <User className="inline-block w-5 h-5 ml-2 text-gold" />
                        الاسم
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="text-right bg-gray-50 border-gray-300 focus:border-gold focus:ring-gold"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-right block text-lg">
                        <Phone className="inline-block w-5 h-5 ml-2 text-gold" />
                        رقم الجوال
                      </Label>
                      <PhoneInput
                        country="sa"
                        value={formData.phone}
                        onChange={(phone) => setFormData({ ...formData, phone })}
                        inputProps={{
                          required: true,
                          id: "phone"
                        }}
                        containerClass="!w-full"
                        inputClass="!w-full !h-10 !text-right !pr-[48px] !bg-gray-50 !border-gray-300"
                        buttonClass="!border-gray-300 !bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-right block text-lg">
                      <MapPin className="inline-block w-5 h-5 ml-2 text-gold" />
                      مدينة العقار
                    </Label>
                    <RadioGroup
                      value={formData.city}
                      onValueChange={(value) => setFormData({ ...formData, city: value })}
                      className="flex gap-4"
                    >
                      {["جدة", "مكة"].map((city) => (
                        <div key={city} className="flex items-center">
                          <RadioGroupItem value={city} id={`city-${city}`} className="border-gold text-gold" />
                          <Label htmlFor={`city-${city}`} className="mr-2">{city}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-right block text-lg">
                      <Building2 className="inline-block w-5 h-5 ml-2 text-gold" />
                      نوع العقار
                    </Label>
                    <RadioGroup
                      value={formData.property_type}
                      onValueChange={(value) => setFormData({ ...formData, property_type: value })}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      {["فيلا", "شقة", "روف", "أرض"].map((type) => (
                        <div key={type} className="flex items-center">
                          <RadioGroupItem value={type} id={`type-${type}`} className="border-gold text-gold" />
                          <Label htmlFor={`type-${type}`} className="mr-2">{type}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold/90 text-white text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري الإرسال..." : "التالي"}
                    <ArrowRight className="mr-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <style>{`
        .react-tel-input .form-control {
          direction: ltr;
          text-align: right;
          padding-right: 48px !important;
          height: 2.5rem !important;
        }
        .react-tel-input .selected-flag {
          right: 0;
          left: auto;
          border-radius: 0 6px 6px 0;
        }
        .react-tel-input .country-list {
          right: 0;
          left: auto;
        }
      `}</style>
    </div>
  );
};

export default PropertyRequest;
