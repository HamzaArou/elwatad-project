import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partners = [
  {
    name: "البنك الأهلي السعودي",
    logo: "/lovable-uploads/6fe8f39b-e015-4493-866d-f073883d6e52.png",
  },
  {
    name: "مصرف الراجحي",
    logo: "/lovable-uploads/18437cd2-1c8f-484d-beb7-675bf3e8d912.png",
  },
  {
    name: "مصرف الإنماء",
    logo: "/lovable-uploads/0de09264-fb28-428d-93b2-451753c9f96f.png",
  },
  {
    name: "بنك الرياض",
    logo: "/lovable-uploads/dd9a17ff-23e4-433c-b305-be825666128c.png",
  },
  {
    name: "البنك العربي الوطني",
    logo: "/lovable-uploads/cdf2739a-f7e4-4b33-8c20-5b947606b0fb.png",
  },
  {
    name: "البنك السعودي للاستثمار",
    logo: "/lovable-uploads/e764f846-305a-4550-ad09-657c7f8022fe.png",
  },
  {
    name: "البنك السعودي الفرنسي",
    logo: "/lovable-uploads/d3014d6a-083d-4d31-bda5-799c821b8001.png",
  },
  {
    name: "عالم الخزائن",
    logo: "/lovable-uploads/ae22bead-fa19-4118-ad43-5d1ad219282e.png",
  },
  {
    name: "الخزائن المبتكرة",
    logo: "/lovable-uploads/44f0baef-16d0-414a-bb50-49b4dd8a7997.png",
  },
  {
    name: "العيدروس",
    logo: "/lovable-uploads/cab06c45-41de-43d7-bbaa-cdf3b3cee32f.png",
  },
  {
    name: "وتد الكيان العقارية",
    logo: "/lovable-uploads/685f1b71-7d10-4065-a7a5-7b83cfab395a.png",
  },
];

const Partners = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 300;

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollDistance = direction === 'left' ? -scrollAmount : scrollAmount;
      
      container.scrollBy({
        left: scrollDistance,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-[#f5f5f5] relative">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-right">
          <h2 className="text-3xl font-bold text-white inline-block bg-darkBlue px-4 py-2 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px]">
            شركاء النجاح
          </h2>
        </div>
        
        <div className="relative mx-16">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-8 px-4 scroll-smooth partners-carousel"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white rounded-full p-6 w-56 h-56 flex items-center justify-center transform hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-[85%] max-h-[85%] object-contain"
                />
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;