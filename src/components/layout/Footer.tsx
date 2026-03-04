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
              <img src="./logo.png" alt="AERO PERFUMES" className="h-24 md:h-32 w-auto object-contain mb-2" />
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
            <div className="space-y-3">
              <a href="https://wa.me/573159272615" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-[#25D366] hover:shadow-md transition-all duration-300 group bg-white">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">WhatsApp</p>
                  <p className="text-xs font-bold text-gray-800 group-hover:text-[#25D366] transition-colors">+57 315 927 2615</p>
                </div>
              </a>

              <a href="https://www.instagram.com/perfumeria_aero" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-[#E1306C] hover:shadow-md transition-all duration-300 group bg-white">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-colors">
                  <Instagram size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Instagram</p>
                  <p className="text-xs font-bold text-gray-800 group-hover:text-[#E1306C] transition-colors">@perfumeria_aero</p>
                </div>
              </a>

              <a href="mailto:info@perfumeriaaero.com" className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all duration-300 group bg-white">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Email</p>
                  <p className="text-xs font-bold text-gray-800 group-hover:text-blue-500 transition-colors">info@perfumeriaaero.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Column 4: Physical Location */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-black mb-6">Visítanos</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-gold/30 hover:shadow-sm transition-all duration-300 bg-white group">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Horario</p>
                  <p className="text-sm font-medium text-gray-900">Domingo - Domingo</p>
                  <p className="text-xs text-gray-500">9:00 am a 8:00 pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-gold/30 hover:shadow-sm transition-all duration-300 bg-white group">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Ubicación</p>
                  <p className="text-sm font-medium text-gray-900">Cúcuta, N. de Santander</p>
                  <p className="text-xs text-gray-500">Calle 2 # 11e-92 Q. Oriental</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex justify-center">
          <p className="text-xs text-gray-400 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Perfumería Aero. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
