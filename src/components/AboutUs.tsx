
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return <section className="py-16 overflow-hidden bg-[#2f4447]">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Title visible only on mobile */}
        <h2 className="text-5xl font-bold text-white text-center mb-8 md:hidden">
          عن وتد
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            {/* Title visible only on desktop, positioned at the top of the text */}
            <h2 className="hidden md:block text-5xl font-bold text-white mb-8 text-center">
              عن وتد
            </h2>
            
            {/* Oblique background with more pronounced slanting and reduced height */}
            <div className="absolute inset-0 bg-[#234F27] transform -skew-x-12 -skew-y-3 rounded-[20px] -z-10"></div>
            
            {/* Content with adjusted padding for reduced height */}
            <div className="relative p-6">
              <p className="text-white/90 leading-relaxed text-lg mb-8">في وتد الكيان العقارية، نؤمن بأن العقار ليس مجرد مبنى، بل هو استثمار لحياة أفضل. نسعى لتقديم حلول عقارية متكاملة تناسب احتياجاتك، سواء كنت تبحث عن منزل الأحلام أو فرصة استثمارية واعدة.

نعمل بخبرة واحترافية لنكون شريكك العقاري الموثوق، ونوفر لك مجموعة متنوعة من العقارات في أفضل المواقع، مع خدمات استشارية ودعم متكامل قبل وأثناء وبعد الشراء.</p>

              <div className="text-center">
                <Button 
                  onClick={() => navigate('/about')}
                  className="bg-[#B69665] hover:bg-[#B69665]/90 text-white font-bold text-lg rounded-full shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 px-8 py-6"
                >
                  اعرف المزيد عن وتد
                </Button>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative overflow-hidden rounded-[50px] shadow-2xl">
              <img src="/lovable-uploads/846a9d6e-0e88-4891-b25c-203b5b88bc86.png" alt="مجموعة الفيصل العقارية - نموذج معماري" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default AboutUs;
