import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "573159272615"; // Colombia country code +57
  const message = "Hola, estoy interesado en un perfume de Perfumería Aero.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute right-full mr-4 bg-white text-black text-xs font-bold px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        ¿Necesitas ayuda?
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-white"></span>
      </span>
      
      <div className="relative hover:scale-110 transition-transform duration-300">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp" 
          className="w-14 h-14 drop-shadow-2xl filter"
        />
      </div>
    </a>
  );
};

export default WhatsAppButton;
