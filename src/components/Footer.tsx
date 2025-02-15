
import { Twitter, Instagram, Mail, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumber = "+966505148231";
  const whatsappNumber = "966505148231";
  const mapUrl = "https://maps.app.goo.gl/sMQoUi9T15nYNpfo9";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${whatsappNumber}`;
  };

  const scrollToSection = async (sectionId: string) => {
    if (location.pathname !== '/') {
      await navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
          const sectionTop = section.offsetTop - headerHeight;
          window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
        const sectionTop = section.offsetTop - headerHeight;
        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });
      }
    }
  };

  const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );

  return (
    <footer className="relative bg-[#2F4447] text-white">
      {/* City Skyline SVG Background */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
          <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,133.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
        {/* Top Section with Logo and Navigation */}
        <div className="pt-16 pb-8 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Tagline */}
            <div className="text-center lg:text-right">
              <img 
                src="/lovable-uploads/1f1e6660-2b87-47f7-a630-d9b632edd19e.png" 
                alt="وتد الكيان العقارية" 
                className="w-[140px] h-[160px] object-contain mx-auto lg:mr-0"
              />
              <p className="text-white/80 mt-4">حيث يلتقي الطموح بالواقع!</p>
            </div>

            {/* Quick Links */}
            <div className="text-center lg:text-right">
              <h3 className="text-xl font-bold mb-6 text-gold">روابط سريعة</h3>
              <ul className="space-y-3">
                {[
                  { id: 'hero', text: 'الرئيسية' },
                  { id: 'properties', text: 'العقارات' },
                  { id: 'about', text: 'من نحن' },
                  { id: 'request', text: 'اطلب عقارك' },
                  { id: 'services', text: 'خدماتنا' },
                  { id: 'register', text: 'تسجيل' }
                ].map(link => (
                  <li key={link.id}>
                    <button 
                      onClick={() => scrollToSection(link.id)}
                      className="text-white/80 hover:text-gold transition-colors duration-300"
                    >
                      {link.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center lg:text-right">
              <h3 className="text-2xl font-bold mb-8 text-gold text-right">تواصل معنا</h3>
              <div className="space-y-4 text-right">
                <p className="text-xl font-semibold text-white">وتد الكيان العقارية</p>
                <p className="text-white/80 text-base leading-relaxed">
                  6588 حي, Batha Quraish، 4226,
                  <br />
                  Makkah 24352, Saudi Arabia
                </p>
                <div className="flex justify-end gap-6 mt-8">
                  <a href="https://www.snapchat.com/add/alfaisal_group" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors duration-300">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  </a>
                  <a href="https://x.com/alfaisal_group?s=21" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors duration-300">
                    <Twitter className="w-7 h-7" />
                  </a>
                  <a href="https://www.instagram.com/alfaisal_group?igsh=MXE2MGY2bzJiODB0Zw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors duration-300">
                    <Instagram className="w-7 h-7" />
                  </a>
                  <a href="https://www.tiktok.com/@alfaisal_group?_t=ZS-8t2MVNY6jxw&_r=1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors duration-300">
                    <TikTokIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="text-center lg:text-right">
              <h3 className="text-2xl font-bold mb-8 text-gold text-right">موقعنا</h3>
              <a 
                href={mapUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block hover:opacity-90 transition-opacity"
              >
                <img 
                  src="/lovable-uploads/a544c699-418c-470d-b4ab-94ab59cf1cc0.png" 
                  alt="موقع الشركة على الخريطة" 
                  className="w-full h-[200px] object-cover rounded-lg shadow-lg"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="py-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} جميع الحقوق محفوظة لمجموعة الفيصل العقارية
            </p>
            <div className="flex items-center gap-4">
              <button onClick={handleCall} className="text-white/80 hover:text-gold transition-colors duration-300 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>اتصل بنا</span>
              </button>
              <button onClick={handleWhatsApp} className="text-white/80 hover:text-gold transition-colors duration-300 flex items-center gap-2">
                <img src="/lovable-uploads/5a30ecf6-b0b1-41ce-908d-7d07e173fe6e.png" alt="WhatsApp" className="w-5 h-5" />
                <span>واتساب</span>
              </button>
              <Link to="/privacy-policy" className="text-white/80 hover:text-gold transition-colors duration-300">
                سياسة الخصوصية
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
