
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PhoneInput from "react-phone-input-2";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">طلب عقار</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            في وتد الكيان العقارية، نقدم لك مجموعة متميزة من العقارات التي تتناسب مع تطلعاتك، سواء كنت تبحث عن عقار للسكن أو للاستثمار. نحرص على تقديم حلول عقارية تناسب احتياجاتك، مع خطوات سلسة وواضحة تضمن لك أفضل تجربة ممكنة.
          </p>
          <p className="text-lg text-gray-700 font-semibold">
            سجل بياناتك الآن، ليتمكن فريق المبيعات من خدمتك بشكل أسرع وعرض العقار لك بكل سهولة!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right block">الاسم</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-right"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-right block">رقم الجوال</Label>
                <PhoneInput
                  country="sa"
                  value={formData.phone}
                  onChange={(phone) => setFormData({ ...formData, phone })}
                  inputProps={{
                    required: true,
                    id: "phone"
                  }}
                  containerClass="!w-full"
                  inputClass="!w-full !h-10 !text-right !pr-[48px]"
                  buttonClass="!border-input"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-right block mb-2">مدينة العقار</Label>
                <RadioGroup
                  value={formData.city}
                  onValueChange={(value) => setFormData({ ...formData, city: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="جدة" id="city-jeddah" />
                    <Label htmlFor="city-jeddah">جدة</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="مكة" id="city-makkah" />
                    <Label htmlFor="city-makkah">مكة</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-right block mb-2">نوع العقار</Label>
                <RadioGroup
                  value={formData.property_type}
                  onValueChange={(value) => setFormData({ ...formData, property_type: value })}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="فيلا" id="type-villa" />
                    <Label htmlFor="type-villa">فيلا</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="شقة" id="type-apartment" />
                    <Label htmlFor="type-apartment">شقة</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="روف" id="type-roof" />
                    <Label htmlFor="type-roof">روف</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="أرض" id="type-land" />
                    <Label htmlFor="type-land">أرض</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
              </Button>
            </form>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">لماذا تختار وتد الكيان العقارية؟</h2>
            <ul className="space-y-4 text-right">
              <li className="flex items-center gap-2 text-gray-700">
                <span>نوفر لك عقارات متنوعة بمواقع استراتيجية وأسعار تنافسية.</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span>نضمن لك تجربة سلسة من البداية حتى توقيع العقود.</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span>فريقنا مستعد لمساعدتك في اختيار العقار المناسب لك.</span>
              </li>
            </ul>
            <p className="mt-8 text-gray-700 font-semibold text-right">
              املأ النموذج الآن، وسيتواصل معك أحد مستشارينا العقاريين بأسرع وقت.
            </p>
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
