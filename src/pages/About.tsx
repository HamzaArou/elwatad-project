import { Building2, Shield, Star, SparklesIcon, Briefcase, MapPin, Search, Zap, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";

const About = () => {
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: "0px"
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/lovable-uploads/6fc860b8-1756-41bd-90cb-d1103f9913d7.png"
            alt="وتد الكيان العقارية"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">من نحن</h1>
          <p className="text-xl">تعرف على وتد الكيان العقارية</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-right">
            <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
              عن وتد الكيان العقارية
            </h2>
          </div>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              في وتد الكيان العقارية، نؤمن بأن العقار ليس مجرد مبنى، بل هو استثمار لحياة أفضل. نسعى لتقديم حلول عقارية متكاملة تناسب احتياجاتك، سواء كنت تبحث عن منزل الأحلام أو فرصة استثمارية واعدة.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              نعمل بخبرة واحترافية لنكون شريكك العقاري الموثوق، ونوفر لك مجموعة متنوعة من العقارات في أفضل المواقع، مع خدمات استشارية ودعم متكامل قبل وأثناء وبعد الشراء.
            </p>
            <p className="text-xl font-bold text-[#2F4447]">
              وتد الكيان العقارية – حيث يلتقي الطموح بالواقع!
            </p>
          </div>
        </div>
      </section>

      {/* After-Sale Services Section */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-right">
            <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
              خدمات ما بعد البيع
            </h2>
          </div>
          <div className="max-w-4xl mx-auto mb-8 text-center">
            <p className="text-lg text-gray-700 leading-relaxed animate-fade-in">
              لأن راحتك تهمنا في وتد الكيان العقارية، لا تنتهي علاقتنا بك بمجرد شراء العقار، بل نحرص على تقديم خدمات ما بعد البيع لضمان راحتك ورضاك التام. نقدم لك دعمًا متكاملاً يشمل:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "الاستشارات العقارية",
                description: "لمساعدتك في أي استفسارات بعد الشراء",
                icon: Shield,
                delay: 100
              },
              {
                title: "متابعة الإجراءات",
                description: "دعمك في التوثيق ونقل الملكية بكل سهولة",
                icon: Building2,
                delay: 200
              },
              {
                title: "الصيانة والتجهيز",
                description: "ربطك بمزودي الخدمات الموثوقين لتحسين وتجهيز العقار",
                icon: Star,
                delay: 300
              },
              {
                title: "إدارة العقارات",
                description: "للمستثمرين الراغبين في تأجير عقاراتهم بكل احترافية",
                icon: Building2,
                delay: 400
              }
            ].map((service, index) => (
              <div
                key={index}
                ref={el => observerRefs.current[index] = el}
                className="transform opacity-0 translate-y-8 transition-all duration-700 ease-out service-card"
              >
                <Card className="bg-white hover:shadow-xl transition-all duration-500 group h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B69665]/20 to-[#2F4447]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-[#B69665] group-hover:text-[#2F4447] transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2F4447] mb-3 group-hover:text-[#B69665] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B69665]/5 to-[#2F4447]/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Advantages Section */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-right">
            <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
              مانتميز به
            </h2>
          </div>
          <div className="max-w-4xl mx-auto mb-8 text-center">
            <p className="text-lg text-gray-700 leading-relaxed animate-fade-in">
              في وتد الكيان العقارية، نؤمن بأن نجاحنا يأتي من قدرتنا على تقديم تجربة عقارية استثنائية تجمع بين الجودة، الاحترافية، والثقة. نحن نتميز بـ:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Briefcase,
                title: "الخبرة الواسعة",
                description: "فريق متخصص في السوق العقاري يوفر لك أفضل الحلول والاستشارات",
                delay: 500
              },
              {
                icon: MapPin,
                title: "عقارات في مواقع استراتيجية",
                description: "نوفر لك خيارات مميزة في أفضل الأحياء والمناطق",
                delay: 600
              },
              {
                icon: Search,
                title: "شفافية ووضوح",
                description: "نحرص على تقديم معلومات دقيقة لضمان اتخاذ قرارات استثمارية صحيحة",
                delay: 700
              },
              {
                icon: Zap,
                title: "سرعة الإنجاز",
                description: "إجراءات سلسة وسريعة لإنهاء معاملاتك بكل سهولة",
                delay: 800
              },
              {
                icon: Headphones,
                title: "خدمة عملاء متميزة",
                description: "دعم مستمر وخدمات ما بعد البيع لضمان راحتك ورضاك",
                delay: 900
              }
            ].map((advantage, index) => (
              <div
                key={index}
                ref={el => observerRefs.current[index + 4] = el}
                className="transform opacity-0 translate-y-8 transition-all duration-700 ease-out advantage-card"
              >
                <Card className="group relative overflow-hidden bg-white hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 border-2 hover:border-[#B69665] h-full">
                  <CardContent className="p-6">
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#B69665]/10 to-[#2F4447]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <advantage.icon className="w-8 h-8 text-[#B69665] group-hover:text-[#2F4447] transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-[#2F4447] mb-4 group-hover:text-[#B69665] transition-colors duration-300">
                        {advantage.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {advantage.description}
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B69665]/5 to-[#2F4447]/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-right">
            <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
              آفاق نضيفها
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "خدمة التنبيهات الذكية",
              "الأسئلة المتكررة",
              "أحدث العروض العقارية",
              "طلب استشارتك المجانية الآن",
              "خدمات التقييم العقاري",
              "تقارير السوق العقاري",
              "تجارب العملاء",
              "خاصية البحث المتقدم",
              "خريطة ذكية لتحديد العقار المثالي"
            ].map((feature, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <SparklesIcon className="w-8 h-8 text-[#B69665] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#2F4447]">{feature}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <style>
        {`
          .service-card.show,
          .advantage-card.show {
            opacity: 1;
            transform: translateY(0);
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </main>
  );
};

export default About;
