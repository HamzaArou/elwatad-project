import { useState, useEffect } from "react";
import { Menu, X, Phone, Heart, UserRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const phoneNumber = "+966505148231";
  const whatsappNumber = "966505148231";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${whatsappNumber}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (location.pathname === '/') {
        const newsSection = document.querySelector('section:nth-of-type(2)');
        const header = document.querySelector('header');
        
        if (newsSection && header) {
          const headerBottom = header.getBoundingClientRect().height;
          const newsSectionTop = newsSection.getBoundingClientRect().top + window.scrollY;
          setIsVisible(currentScrollY + headerBottom <= newsSectionTop);
        }
        setIsScrolled(currentScrollY > 50);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, location.pathname]);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = async (sectionId: string) => {
    setIsMobileMenuOpen(false);

    if (sectionId === 'about') {
      handleNavigation('/about');
      return;
    }
    if (sectionId === 'request') {
      handleNavigation('/property-request');
      return;
    }
    if (sectionId === 'properties') {
      handleNavigation('/properties');
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
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

  const handleAuthClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/register', { state: { redirectTo: location.pathname } });
    }
    setIsMobileMenuOpen(false);
  };

  const handleFavoritesClick = () => {
    if (!user) {
      navigate('/register', { state: { redirectTo: '/' } });
    } else {
      navigate('/favorites');
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "hero", text: "الرئيسية" },
    { href: "properties", text: "العقارات" },
    { href: "about", text: "من نحن" },
    { href: "request", text: "اطلب عقارك" },
    { href: "services", text: "خدماتنا" },
  ];

  const isHomePage = location.pathname === '/';
  const isProjectPage = location.pathname.includes('/project/');
  const isPrivacyPage = location.pathname === '/privacy-policy';
  const isPropertyRequestPage = location.pathname === '/property-request';
  const isPropertiesPage = location.pathname === '/properties';
  const shouldUseGoldText = (isPropertyRequestPage || isPropertiesPage) && !isScrolled;

  const headerBackground = isHomePage 
    ? isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
    : "bg-black";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${headerBackground} h-[120px]`}
    >
      <div className="w-full h-full flex items-center justify-between px-6 md:px-10" dir="ltr">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className={`${shouldUseGoldText ? 'text-[#B69665]' : 
              isProjectPage || isPrivacyPage && !isScrolled ? 'text-black' : 'text-white'} 
              hover:text-gold transition-colors`}
            onClick={handleAuthClick}
          >
            <UserRound className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`${shouldUseGoldText ? 'text-[#B69665]' : 
              isProjectPage || isPrivacyPage && !isScrolled ? 'text-black' : 'text-white'} 
              hover:text-gold transition-colors`}
            onClick={handleFavoritesClick}
          >
            <Heart className="h-6 w-6" />
          </Button>
        </div>

        <nav className="hidden lg:flex items-center justify-center flex-1 px-4">
          <div className="flex gap-8 rtl">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`nav-link font-ibm-arabic font-medium text-lg hover:text-gold transition-colors duration-300 ${
                  shouldUseGoldText ? 'text-[#B69665]' : 
                  isProjectPage || isPrivacyPage && !isScrolled ? 'text-black' : 'text-white'
                } cursor-pointer`}
              >
                {link.text}
              </button>
            ))}
            <button
              onClick={handleAuthClick}
              className={`nav-link font-ibm-arabic font-medium text-lg hover:text-gold transition-colors duration-300 ${
                shouldUseGoldText ? 'text-[#B69665]' : 
                isProjectPage || isPrivacyPage && !isScrolled ? 'text-black' : 'text-white'
              } cursor-pointer`}
            >
              {user ? 'تسجيل خروج' : 'تسجيل'}
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`nav-link font-ibm-arabic font-medium text-lg hover:text-gold transition-colors duration-300 ${
                  shouldUseGoldText ? 'text-[#B69665]' : 
                  isProjectPage || isPrivacyPage && !isScrolled ? 'text-black' : 'text-white'
                } cursor-pointer`}>
                  تواصل معنا
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={handleCall} className="gap-2 cursor-pointer">
                  <Phone className="h-5 w-5" />
                  <span>اتصل بنا</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleWhatsApp} className="gap-2 cursor-pointer">
                  <img 
                    src="/lovable-uploads/5a30ecf6-b0b1-41ce-908d-7d07e173fe6e.png" 
                    alt="WhatsApp"
                    className="h-5 w-5"
                  />
                  <span>واتساب</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        <div className="flex items-center">
          <button 
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="cursor-pointer"
          >
            <img
              src="/lovable-uploads/1f1e6660-2b87-47f7-a630-d9b632edd19e.png"
              alt="وتد الكيان العقارية"
              className="w-[110px] h-[115px] object-contain transition-all duration-300"
            />
          </button>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className={`transition-colors duration-300 ${
              shouldUseGoldText ? 'text-[#B69665]' : 
              isProjectPage || isPrivacyPage && !isScrolled ? 'text-black' : 'text-white'
            } cursor-pointer`}
          >
            {isMobileMenuOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full right-0 left-0 bg-black/90 backdrop-blur-sm shadow-lg animate-slide-in">
          <nav className="flex flex-col p-4 rtl">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="nav-link py-3 font-ibm-arabic text-lg text-white hover:text-gold transition-colors duration-300 text-right w-full cursor-pointer"
              >
                {link.text}
              </button>
            ))}
            <button
              onClick={handleAuthClick}
              className="nav-link py-3 font-ibm-arabic text-lg text-white hover:text-gold transition-colors duration-300 text-right w-full cursor-pointer"
            >
              {user ? 'تسجيل خروج' : 'تسجيل'}
            </button>
            <div className="flex gap-4 py-3">
              <button onClick={handleCall} className="flex items-center gap-2 text-white hover:text-gold cursor-pointer">
                <Phone className="h-5 w-5" />
                <span>اتصل بنا</span>
              </button>
              <button onClick={handleWhatsApp} className="flex items-center gap-2 text-white hover:text-gold cursor-pointer">
                <img 
                  src="/lovable-uploads/5a30ecf6-b0b1-41ce-908d-7d07e173fe6e.png" 
                  alt="WhatsApp"
                  className="h-5 w-5"
                />
                <span>واتساب</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
