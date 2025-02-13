import { Twitter, Instagram, Mail, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumber = "+966505148231";
  const whatsappNumber = "966505148231";
  const mapUrl = "https://maps.app.goo.gl/MqS1HB1ZJpb7xXZv8";
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };
  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${whatsappNumber}`;
  };
  const scrollToSection = async (sectionId: string) => {
    // First navigate to home if not already there
    if (location.pathname !== '/') {
      await navigate('/');
      // Wait for navigation to complete
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
      // If already on home page, just scroll
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
  const TikTokIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>;
  return <footer className="bg-deepBlue text-white py-16">
      <div className="container mx-auto px-4 max-w-[960px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center md:text-right">
            <img src="/lovable-uploads/1f1e6660-2b87-47f7-a630-d9b632edd19e.png" alt="وتد الكيان العقارية" className="w-[160px] h-[180px] object-contain mb-4 mx-auto md:mr-[25px]" />
            <p className="text-white/80 py-0 my-0 text-center">حيث يلتقي الطموح بالواقع!</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-gold transition-colors">
                  الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('projects')} className="hover:text-gold transition-colors">
                  مشاريعنا
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-gold transition-colors">
                  خدماتنا
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('stats')} className="hover:text-gold transition-colors">
                  مميزاتنا
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-gold transition-colors">
                  عن الشركة
                </button>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hover:text-gold transition-colors">
                      اتصل بنا
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[200px]">
                    <DropdownMenuItem onClick={handleCall} className="gap-2 cursor-pointer">
                      <Phone className="h-5 w-5" />
                      <span>اتصل بنا</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleWhatsApp} className="gap-2 cursor-pointer">
                      <img src="/lovable-uploads/5a30ecf6-b0b1-41ce-908d-7d07e173fe6e.png" alt="WhatsApp" className="h-5 w-5" />
                      <span>واتساب</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-gold transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">تواصل معنا</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="https://www.snapchat.com/add/alfaisal_group" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors" aria-label="Snapchat">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </a>
              <a href="https://x.com/alfaisal_group?s=21" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/alfaisal_group?igsh=MXE2MGY2bzJiODB0Zw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.tiktok.com/@alfaisal_group?_t=ZS-8t2MVNY6jxw&_r=1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors" aria-label="TikTok">
                <TikTokIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">موقعنا</h3>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="block mb-4 hover:opacity-90 transition-opacity">
              <img src="/lovable-uploads/a544c699-418c-470d-b4ab-94ab59cf1cc0.png" alt="موقع الشركة على الخريطة" className="w-full rounded-lg shadow-md" />
            </a>
            <p className="text-white/80 text-sm leading-relaxed">
              القاضي, Batha Quraish, Makkah 24231, Saudi Arabia
            </p>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60">
            © جميع الحقوق محفوظة لمجموعة الفيصل العقارية {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;