
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const PropertySearch = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto bg-[#f5f5f5] rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Right Side - Text */}
            <div className="text-right">
              <h2 className="text-3xl font-bold text-deepBlue mb-4">
                اختر عقارك الآن
              </h2>
              <p className="text-xl text-gray-600">
                نساعدك على امتلاك منزل أحلامك
              </p>
            </div>

            {/* Left Side - Selection Options */}
            <div className="space-y-6">
              {/* City Selection */}
              <div className="bg-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-right">المدينة</h3>
                <RadioGroup defaultValue="جدة" className="flex gap-4 justify-end">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Label htmlFor="makkah">مكة</Label>
                    <RadioGroupItem value="مكة" id="makkah" />
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Label htmlFor="jeddah">جدة</Label>
                    <RadioGroupItem value="جدة" id="jeddah" />
                  </div>
                </RadioGroup>
              </div>

              {/* Property Type Selection */}
              <div className="bg-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-right">نوع العقار</h3>
                <RadioGroup defaultValue="شقة" className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 space-x-reverse justify-end">
                    <Label htmlFor="apartment">شقة</Label>
                    <RadioGroupItem value="شقة" id="apartment" />
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse justify-end">
                    <Label htmlFor="villa">فيلا</Label>
                    <RadioGroupItem value="فيلا" id="villa" />
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse justify-end">
                    <Label htmlFor="roof">روف</Label>
                    <RadioGroupItem value="روف" id="roof" />
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse justify-end">
                    <Label htmlFor="land">أرض</Label>
                    <RadioGroupItem value="أرض" id="land" />
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySearch;
