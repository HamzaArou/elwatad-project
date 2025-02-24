import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Phone, User } from "lucide-react";
import PhoneInput from "react-phone-input-2";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: 'service_vsb08u9',
          template_id: 'template_6akmr1f',
          user_id: 'DJX_dy28zAjctAAIj',
          template_params: {
            to_name: "وتد الكيان العقارية",
            to_email: 'pr@wtd.com.sa',
            request_type: 'طلب عقار',
            name: formData.name,
            phone: formData.phone,
            property_type: formData.property_type,
            city: formData.city,
            details: `العميل يبحث عن ${formData.property_type} في مدينة ${formData.city}`
          }
        })
      });

      if (!response.ok) {
        throw new Error(`EmailJS error: ${response.status}`);
      }

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
    <div className="min-h-screen bg-white pt-[120px]">
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Card className="border-0 shadow-xl bg-white overflow-hidden order-2 lg:order-1">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-right">طلب عقار</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-right block text-base font-medium text-gray-700">
                        <User className="inline-block w-4 h-4 ml-2 text-gold" />
                        الاسم
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="text-right mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-right block text-base font-medium text-gray-700">
                        <Phone className="inline-block w-4 h-4 ml-2 text-gold" />
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
                        containerClass="!w-full mt-1"
                        inputClass="!w-full !h-10 !text-right !pr-[48px]"
                        buttonClass="!border-input"
                      />
                    </div>

                    <div>
                      <Label className="text-right block text-base font-medium text-gray-700">
                        <MapPin className="inline-block w-4 h-4 ml-2 text-gold" />
                        مدينة العقار
                      </Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {["جدة", "مكة"].map((city) => (
                          <button
                            key={city}
                            type="button"
                            onClick={() => setFormData({ ...formData, city })}
                            className={`py-3 px-6 text-center rounded-lg border-2 transition-all duration-300 ${
                              formData.city === city
                                ? "border-gold bg-gold text-white"
                                : "border-gray-200 hover:border-gold text-gray-600"
                            }`}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-right block text-base font-medium text-gray-700">
                        <Building2 className="inline-block w-4 h-4 ml-2 text-gold" />
                        نوع العقار
                      </Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {["فيلا", "شقة", "روف", "أرض"].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, property_type: type })}
                            className={`py-3 px-6 text-center rounded-lg border-2 transition-all duration-300 ${
                              formData.property_type === type
                                ? "border-gold bg-gold text-white"
                                : "border-gray-200 hover:border-gold text-gray-600"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold/90 text-white text-lg h-12 mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8 order-1 lg:order-2 lg:sticky lg:top-8">
              <div className="text-right">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  ابحث عن عقارك المثالي معنا
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  نقدم لك م��موعة متميزة من العقارات بمواقع استراتيجية وأسعار تنافسية
                </p>
              </div>

              <Card className="border-0 shadow-lg bg-[#2F4447] text-white">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-2xl font-bold text-white text-right mb-6">لماذا تختار وتد الكيان العقارية؟</h3>
                  <ul className="space-y-6">
                    <li className="flex flex-row-reverse items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-gold flex-shrink-0"></div>
                      <span className="text-right text-base">نوفر لك عقارات متنوعة بمواقع استراتيجية</span>
                    </li>
                    <li className="flex flex-row-reverse items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-gold flex-shrink-0"></div>
                      <span className="text-right text-base">نضمن لك تجربة سلسة من البداية حتى توقيع العقود</span>
                    </li>
                    <li className="flex flex-row-reverse items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-gold flex-shrink-0"></div>
                      <span className="text-right text-base">فريقنا مستعد لمساعدتك في اختيار العقار المناسب لك</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .react-tel-input .form-control {
          direction: ltr;
          text-align: right;
          padding-right: 48px !important;
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
