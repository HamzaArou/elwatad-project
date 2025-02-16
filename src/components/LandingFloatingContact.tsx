
import { Phone, MessageSquare, FileText } from "lucide-react";
import { Twitter, Instagram } from "lucide-react";

interface LandingFloatingContactProps {
  onRegisterClick: () => void;
}

const LandingFloatingContact = ({ onRegisterClick }: LandingFloatingContactProps) => {
  const phoneNumber = "+966505148231";
  const whatsappNumber = "966505148231"; // Removed the + for WhatsApp API format

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${whatsappNumber}`;
  };

  const TikTokIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Social Media Links */}
          <div className="flex gap-4">
            <a
              href="https://www.snapchat.com/t/pKato0AS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold/90 transition-colors"
              aria-label="Snapchat"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </a>
            <a
              href="https://x.com/wtd_2030?s=21&t=hN-a0qLjyLuJQBItnRQJig"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold/90 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/wtd.2030/?igsh=MWZyaTJidTlicXEzbg%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold/90 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.tiktok.com/@wtd.2030?_t=8nQz6qwvWwi&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold/90 transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
          </div>

          {/* Contact Buttons */}
          <div className="flex gap-6">
            {/* Enquiry Button */}
            <button
              onClick={onRegisterClick}
              className="flex flex-col items-center gap-1 text-gold hover:text-gold/90 transition-colors"
            >
              <FileText className="h-6 w-6" />
              <span className="text-xs font-medium">سجل اهتمامك</span>
            </button>

            {/* Call Button */}
            <button
              onClick={handleCall}
              className="flex flex-col items-center gap-1 text-gold hover:text-gold/90 transition-colors"
            >
              <Phone className="h-6 w-6" />
              <span className="text-xs font-medium">اتصل بنا</span>
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              className="flex flex-col items-center gap-1 text-gold hover:text-gold/90 transition-colors"
            >
              <img 
                src="/lovable-uploads/6a730dd7-0c36-4710-8884-63a984210887.png"
                alt="WhatsApp"
                className="h-6 w-6"
              />
              <span className="text-xs font-medium">واتساب</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFloatingContact;
