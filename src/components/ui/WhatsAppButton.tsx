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
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center hover:shadow-green-500/50"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} fill="white" className="text-white" />
    </a>
  );
};

export default WhatsAppButton;
