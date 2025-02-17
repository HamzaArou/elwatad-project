import { Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const FloatingContact = () => {
  const phoneNumber = "+966509840546";
  const whatsappNumber = "966509840546"; // Removed the + for WhatsApp API format

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${whatsappNumber}`;
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-gold hover:bg-gold/90 shadow-gold"
          >
            <Phone className="h-6 w-6 text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuItem onClick={handleCall} className="gap-2 cursor-pointer">
            <Phone className="h-5 w-5" />
            <span>اتصل بنا</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleWhatsApp}
            className="gap-2 cursor-pointer"
          >
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
  );
};

export default FloatingContact;