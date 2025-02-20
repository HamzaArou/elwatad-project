import { useEffect, useRef, useState } from "react";
import { Ruler, Building2, Building, PencilRuler } from "lucide-react";
const stats = [{
  icon: Ruler,
  value: "136K",
  label: "متر مربع",
  color: "text-darkBlue"
}, {
  icon: Building2,
  value: "600",
  label: "وحدة سكنية",
  color: "text-darkBlue"
}, {
  icon: Building,
  value: "40",
  label: "مبــــنى",
  color: "text-darkBlue"
}, {
  icon: PencilRuler,
  value: "25",
  label: "مشــــروع",
  color: "text-darkBlue"
}];
const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <section ref={sectionRef} className="pt-12 pb-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-right">
          <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">أرقام وتد</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => <div key={index} className={`transform transition-all duration-500 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{
          transitionDelay: `${index * 100}ms`,
          background: "linear-gradient(145deg, #ffffff 0%, #f8f8f8 100%)"
        }}>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-warmBeige/20 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-gold" />
                </div>
                <div className="text-4xl font-bold text-gold">
                  {isVisible ? stat.value : "0"}
                </div>
                <div className="text-darkBlue font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Stats;