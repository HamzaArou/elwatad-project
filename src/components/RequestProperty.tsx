import { Button } from "./ui/button";
const RequestProperty = () => {
  return <section className="relative w-full bg-deepBlue overflow-hidden">
      {/* Angled shape container */}
      <div className="relative w-full" style={{
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 85%)" // Changed the clip-path to match the screenshot
    }}>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Image container */}
            <div className="w-full md:w-1/2 relative z-10">
              <img src="/lovable-uploads/697a92cd-3c0f-4b48-b2b7-ee819715bd38.png" alt="Modern House" className="w-full h-auto object-cover rounded-3xl" />
            </div>
            
            {/* Text content */}
            <div className="w-full md:w-1/2 text-right space-y-6 py-[32px] px-[63px] mx-0 my-[22px]">
              <h2 className="text-4xl md:text-5xl font-bold text-white px-0">خطوتك الأولى نحو عقارك المثالي</h2>
              <div className="relative">
                <h3 className="<h1 class=\"\n  font-bold\n  text-white\n  relative\n  z-10\n  md:text-8xl\n  text-7xl\n  mx-0\n  px-[4px]\n  py-[2px]\n  whitespace-nowrap\n\">\n  \u062A\u0628\u062F\u0623 \u0647\u0646\u0627!\n</h1>">تبدأ هنا!</h3>
                {/* Gold bar behind بخطوة */}
                <div className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 w-[140%] h-3 bg-gold opacity-75 z-0 px-0 py-[8px] my-0 mx-0"></div>
              </div>
              <div className="pt-6">
                <Button className="bg-gold hover:bg-gold/90 text-white px-8 py-6 text-xl rounded-md transition-all duration-300 hover:scale-105" onClick={() => window.location.href = '/contact'}>
                  اطلب الآن
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default RequestProperty;