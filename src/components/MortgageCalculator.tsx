import { useState } from "react";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const MortgageCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(10000);
  const [downPayment, setDownPayment] = useState(3000);
  const [duration, setDuration] = useState(19);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: ""
  });
  const {
    toast
  } = useToast();

  // Calculate values
  const totalEligibleAmount = propertyValue - downPayment;
  const adminFees = totalEligibleAmount * 0.01; // 1% of the loan amount
  const annualRate = 0.0460; // 4.60%
  const addedProfits = totalEligibleAmount * annualRate * duration;
  const totalPayment = totalEligibleAmount + addedProfits;
  const monthlyInstallment = (totalPayment / (duration * 12)).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // First, save to database
      const {
        error: dbError
      } = await supabase.from('interest_forms').insert([{
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone
      }]);
      if (dbError) throw dbError;

      // Then, send email using Supabase Edge Function
      const {
        error: emailError
      } = await supabase.functions.invoke('send-mortgage-email', {
        body: {
          ...formData,
          propertyValue,
          downPayment,
          duration,
          monthlyInstallment,
          totalEligibleAmount
        }
      });
      if (emailError) throw emailError;
      toast({
        title: "تم إرسال طلبك بنجاح",
        description: "سنتواصل معك قريباً"
      });
      setIsDialogOpen(false);
      setFormData({
        full_name: "",
        email: "",
        phone: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "حدث خطأ",
        description: "الرجاء المحاولة مرة أخرى",
        variant: "destructive"
      });
    }
  };

  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="inline-block bg-white py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665] px-[57px]">
            حاسبة التمويل العقاري
          </h2>
        </div>

        <div className="max-w-[960px] mx-auto mb-12 text-center">
          <h3 className="text-2xl font-bold text-[#2F4447] mb-4">
            خطوتك الأولى نحو امتلاك عقارك!
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            حدد تفاصيل العقار الذي ترغب في شرائه، واحصل على تقدير دقيق للدفعة الأولى، قيمة الأقساط الشهرية، ومدة التمويل المناسبة لك.
          </p>
        </div>

        <div className="max-w-[960px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#cccccc] to-[#cccccc]/90 text-black p-8 rounded-lg order-2 lg:order-1">
              <div className="text-center mb-8">
                <h3 className="text-lg mb-2">المبلغ الإجمالي المؤهل</h3>
                <p className="text-4xl font-bold mb-4">
                  {totalEligibleAmount.toLocaleString()}
                  <span className="text-lg mr-1">SR</span>
                </p>
                <div className="border-t border-white/20 pt-4">
                  <h4 className="text-lg mb-2">الأقساط الشهرية</h4>
                  <p className="text-3xl font-bold">
                    {monthlyInstallment}
                    <span className="text-lg mr-1">SR</span>
                  </p>
                </div>
              </div>

              <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen} className="transition-all duration-300 ease-in-out">
                <CollapsibleTrigger className="w-full text-center mt-6 flex items-center justify-center gap-2 hover:text-gold transition-colors">
                  <span>{isDetailsOpen ? 'إخفاء التفاصيل' : 'توسيع القائمة لعرض التفاصيل'}</span>
                  <ChevronDown className={`transform transition-transform duration-300 ${isDetailsOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                  <div className="space-y-4 border-t border-white/20 pt-4">
                    <div className="flex justify-between">
                      <span>الرسوم الإدارية</span>
                      <span>{adminFees.toFixed(2)} <span className="text-sm">SR</span></span>
                    </div>
                    <div className="flex justify-between">
                      <span>الأرباح المضافة</span>
                      <span>{addedProfits.toFixed(2)} <span className="text-sm">SR</span></span>
                    </div>
                    <div className="flex justify-between">
                      <span>معدل النسبة السنوي</span>
                      <span>{(annualRate * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>إجمالي السداد</span>
                      <span>{totalPayment.toFixed(2)} <span className="text-sm">SR</span></span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-6 bg-darkBlue hover:bg-darkBlue/90 text-white">
                    تقدم بطلبك الآن
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] gap-6">
                  <DialogHeader>
                    <DialogTitle className="text-right text-xl">تقدم بطلبك الآن</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 text-right">
                      <Label htmlFor="full_name">الاسم الكامل</Label>
                      <Input id="full_name" value={formData.full_name} onChange={e => setFormData({
                      ...formData,
                      full_name: e.target.value
                    })} required className="text-right" dir="rtl" />
                    </div>
                    <div className="space-y-2 text-right">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                      ...formData,
                      email: e.target.value
                    })} required className="text-right" dir="rtl" />
                    </div>
                    <div className="space-y-2 text-right">
                      <Label htmlFor="phone">رقم الجوال</Label>
                      <PhoneInput country="sa" value={formData.phone} onChange={phone => setFormData({
                      ...formData,
                      phone: phone
                    })} inputProps={{
                      required: true,
                      id: "phone"
                    }} containerClass="!w-full" inputClass="!w-full !h-10 !text-right !pr-[48px]" buttonClass="!border-input" />
                    </div>
                    <Button type="submit" className="w-full bg-gold hover:bg-gold/90">
                      إرسال
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xl font-bold text-gray-800">قيمة العقار</label>
                  <div className="relative">
                    <div className="flex items-center gap-2 bg-white border-2 border-darkBlue rounded-full px-4 py-2">
                      <Input type="number" value={propertyValue} onChange={e => setPropertyValue(Number(e.target.value))} className="w-24 text-left border-none p-0 text-lg font-bold focus-visible:ring-0" />
                      <span className="text-sm font-medium text-gray-600">SR</span>
                    </div>
                  </div>
                </div>
                <div className="relative px-1">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-darkBlue text-white px-3 py-1 rounded-full text-sm">
                    {propertyValue.toLocaleString()} SR
                  </div>
                  <Slider value={[propertyValue]} onValueChange={([value]) => setPropertyValue(value)} max={100000000} // Updated to 100 million
                step={100000} // Adjusted step for better control with larger numbers
                className="my-4" />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>SR {100000000 .toLocaleString()}</span>
                    <span>SR 0</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <label className="text-xl font-bold text-gray-800">الدفعة الأولى</label>
                    <span className="text-sm text-gray-500 mt-1 block">*5% - 30% كحد أقصى من قيمة العقار</span>
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-2 bg-white border-2 border-darkBlue rounded-full px-4 py-2">
                      <Input type="number" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className="w-24 text-left border-none p-0 text-lg font-bold focus-visible:ring-0" />
                      <span className="text-sm font-medium text-gray-600">SR</span>
                    </div>
                  </div>
                </div>
                <div className="relative px-1">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-darkBlue text-white px-3 py-1 rounded-full text-sm">
                    {downPayment.toLocaleString()} SR
                  </div>
                  <Slider value={[downPayment]} onValueChange={([value]) => setDownPayment(value)} max={propertyValue * 0.3} step={1000} className="my-4" />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>SR {(propertyValue * 0.3).toLocaleString()}</span>
                    <span>SR 0</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xl font-bold text-gray-800">مدة التمويل (بالأعوام)</label>
                  <div className="relative">
                    <div className="flex items-center gap-2 bg-white border-2 border-darkBlue rounded-full px-4 py-2">
                      <Input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-24 text-left border-none p-0 text-lg font-bold focus-visible:ring-0" />
                    </div>
                  </div>
                </div>
                <div className="relative px-1">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-darkBlue text-white px-3 py-1 rounded-full text-sm">
                    {duration}
                  </div>
                  <Slider value={[duration]} onValueChange={([value]) => setDuration(value)} max={30} min={1} step={1} className="my-4" />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>30</span>
                    <span>1</span>
                  </div>
                </div>
              </div>
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
    </section>;
};

export default MortgageCalculator;
