
import { Building2, Store, Wrench, Headphones, Building, CircleDollarSign, BrainCircuit, Home, Calculator, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [{
  icon: Store,
  title: "التسويق العقاري",
  description: "خطط تسويقية احترافية لعرض عقارك بأفضل طريقة ممكنة وجذب المشترين المثاليين"
}, {
  icon: BrainCircuit,
  title: "الاستشارات العقارية",
  description: "نصائح متخصصة لمساعدتك في اتخاذ القرار المناسب وفق احتياجاتك وأهدافك"
}, {
  icon: Home,
  title: "إدارة الأملاك",
  description: "خدمات متكاملة لإدارة وتأجير عقاراتك بكل احترافية، لضمان أعلى عائد استثماري"
}, {
  icon: Sparkles,
  title: "خدمات ما بعد البيع",
  description: "متابعة الإجراءات، الصيانة، وتجهيز العقارات لتجربة سلسة ومرضية"
}];

const Services = () => {
  return <section className="pt-12 pb-16 bg-white">
      <div className="container mx-auto px-[15px] py-[6px]">
        <div className="mb-12 text-right">
          <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">خدمات وتد</h2>
        </div>

        {/* Introduction Text */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h3 className="font-bold text-[#2F4447] mb-4 text-4xl">
            حلول عقارية متكاملة تلبي احتياجاتك
          </h3>
          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            في وتد الكيان العقارية، نقدم لك مجموعة واسعة من الخدمات العقارية التي تضمن لك تجربة سلسة وموثوقة، سواء كنت تبحث عن شراء، بيع، أو استثمار في العقارات. نهدف إلى ضمان رحلة عقارية سهلة وآمنة من البداية وحتى بعد استلام العقار!
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-[#B69665]">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#234F27]/10 to-[#234F27]/20 flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-[#234F27]" />
                </div>
                <h3 className="font-bold text-[#2F4447] mb-3 text-2xl">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>;
};

export default Services;
