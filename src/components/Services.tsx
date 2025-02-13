import { Building2, Store, Wrench, Headphones, Building } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [
  {
    icon: Building,
    title: "الوساطة العقارية",
    description:
      "نقدم خدمات الوساطة العقارية المتكاملة مع التركيز على تلبية احتياجات عملائنا بكفاءة عالية",
  },
  {
    icon: Store,
    title: "التسويق العقاري",
    description:
      "نوفر حلول تسويقية مبتكرة تساعد في الوصول إلى العملاء المستهدفين بفعالية",
  },
  {
    icon: Wrench,
    title: "البناء والمقاولات",
    description:
      "نقدم خدمات البناء والمقاولات بأعلى معايير الجودة والاحترافية في التنفيذ",
  },
  {
    icon: Headphones,
    title: "التشغيل",
    description:
      "نضمن تشغيل وإدارة المشاريع العقارية بكفاءة عالية لتحقيق أفضل النتائج",
  },
  {
    icon: Building2,
    title: "التطوير العقاري",
    description:
      "نطور مشاريع عقارية متميزة تلبي تطلعات عملائنا وتضيف قيمة للمجتمع",
  },
];

const Services = () => {
  return (
    <section className="pt-12 pb-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-right">
          <h2 className="text-3xl font-bold text-white inline-block bg-deepBlue px-4 py-2 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px]">
            خدمات الفيصل
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#234F27]/10 to-[#234F27]/20 flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-[#234F27]" />
                </div>
                <h3 className="text-base sm:text-sm md:text-base font-bold text-darkBlue mb-2">
                  {service.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
