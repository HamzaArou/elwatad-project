import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
interface ProjectContactButtonsProps {
  className?: string;
}
export default function ProjectContactButtons({
  className
}: ProjectContactButtonsProps) {
  // Contact information
  const whatsappNumber = "+966500000000"; // Replace with actual number
  const phoneNumber = "+966500000000"; // Replace with actual number

  const handleWhatsAppClick = () => {
    // Format WhatsApp URL with predefined message
    const message = "مرحبا، أنا مهتم بمشروعكم وأود الحصول على مزيد من المعلومات";
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };
  return <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="text-center mb-4">
        <h3 className="font-bold text-gray-800 text-3xl">تواصل مع البائع</h3>
        <p className="text-gray-600 mt-1 text-lg">للاستفسار أو حجز موعد</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Button onClick={handleWhatsAppClick} className="bg-[#25D366] hover:bg-[#22c55e] text-white py-6 rounded-lg flex flex-row-reverse items-center justify-center gap-3 transition-all duration-200 hover:shadow-lg" size="lg">
          <span className="font-semibold">واتس</span>
          <MessageCircle className="h-6 w-6" />
        </Button>
        
        <Button onClick={handleCallClick} className="bg-[#B69665] hover:bg-[#9a7d53] text-white py-6 rounded-lg flex flex-row-reverse items-center justify-center gap-3 transition-all duration-200 hover:shadow-lg" size="lg">
          <span className="font-semibold">اتصال</span>
          <Phone className="h-6 w-6" />
        </Button>
      </div>
    </div>;
}