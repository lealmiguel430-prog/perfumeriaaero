import { Facebook, Instagram, Twitter, Mail, MapPin, Clock, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="lg:pr-8">
            <div className="mb-6 flex flex-col items-start">
              <img src="/logo.png" alt="AERO PERFUMES" className="h-20 w-auto object-contain mb-2" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Ofrecemos una exclusiva selección de aromas para cualquier evento, desde perfumes frescos para el día a día hasta elegantes perfumes para ocasiones especiales.
              Encuentra el perfume ideal que resalte tu personalidad.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1ByauPgJNA/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/perfumeria_aero?igsh=cWZ0NnJkOXVkcGVz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-black mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/terminos" className="hover:text-gold transition-colors">Términos y condiciones</Link></li>
              <li><Link to="/privacidad" className="hover:text-gold transition-colors">Política de privacidad</Link></li>
              <li><Link to="/envios" className="hover:text-gold transition-colors">Política de envíos</Link></li>
              <li><Link to="/devoluciones" className="hover:text-gold transition-colors">Política de devoluciones</Link></li>
              <li><Link to="/pagos" className="hover:text-gold transition-colors">Medios de pago</Link></li>
              <li><Link to="/faq" className="hover:text-gold transition-colors">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          {/* Column 3: Digital Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-black mb-6">Contacto Digital</h4>
            <div className="space-y-4">
              <a href="https://wa.me/573159272615" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow group bg-white">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">WhatsApp</p>
                  <p className="text-sm font-bold text-gray-800">+57 315 927 2615</p>
                </div>
              </a>

              <a href="https://www.instagram.com/perfumeria_aero" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow group bg-white">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                  <Instagram size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Instagram</p>
                  <p className="text-sm font-bold text-gray-800">@perfumeria_aero</p>
                </div>
              </a>

              <a href="mailto:info@perfumeriaaero.com" className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow group bg-white">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Email</p>
                  <p className="text-sm font-bold text-gray-800">info@perfumeriaaero.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Column 4: Physical Location */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-black mb-6">Visítanos</h4>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-lg bg-gray-50">
                <Clock className="text-gold flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-xs font-bold text-gray-900 mb-1">HORARIO DE ATENCIÓN</p>
                  <p className="text-sm text-gray-600">Domingo - Domingo</p>
                  <p className="text-sm font-bold text-gray-800">9:00 am a 8:00 pm</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-lg bg-gray-50">
                <MapPin className="text-gold flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-xs font-bold text-gray-900 mb-1">UBICACIÓN</p>
                  <p className="text-sm text-gray-600">Cúcuta, Colombia</p>
                  <p className="text-sm font-bold text-gray-800">CC Jardín Plaza Local 96</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Perfumeria Aero. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 font-bold uppercase">Pagos Seguros con:</span>
            <div className="flex gap-2">
               {/* Payment Icons */}
               <div className="h-6 px-2 bg-gray-100 rounded text-[10px] flex items-center font-bold text-blue-600">VISA</div>
               <div className="h-6 px-2 bg-gray-100 rounded text-[10px] flex items-center font-bold text-red-500">MC</div>
               <div className="h-6 px-2 bg-gray-100 rounded text-[10px] flex items-center font-bold text-green-600">ADDI</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
