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
            <div className="space-y-4">
              <a href="https://wa.me/573159272615" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-[#25D366]/30 hover:shadow-[0_4px_20px_rgba(37,211,102,0.15)] transition-all duration-300 group bg-white">
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300">
                  <Phone size={22} className="group-hover:animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">WhatsApp</p>
                  <p className="text-sm font-bold text-gray-800 group-hover:text-[#25D366] transition-colors">+57 315 927 2615</p>
                </div>
              </a>

              <a href="https://www.instagram.com/perfumeria_aero" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-[#E1306C]/30 hover:shadow-[0_4px_20px_rgba(225,48,108,0.15)] transition-all duration-300 group bg-white">
                <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-[#E1306C] group-hover:bg-gradient-to-tr group-hover:from-[#F58529] group-hover:via-[#DD2A7B] group-hover:to-[#8134AF] group-hover:text-white transition-all duration-300">
                  <Instagram size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Instagram</p>
                  <p className="text-sm font-bold text-gray-800 group-hover:text-[#E1306C] transition-colors">@perfumeria_aero</p>
                </div>
              </a>

              <a href="mailto:info@perfumeriaaero.com" className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-blue-500/30 hover:shadow-[0_4px_20px_rgba(59,130,246,0.15)] transition-all duration-300 group bg-white">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Email</p>
                  <p className="text-sm font-bold text-gray-800 group-hover:text-blue-500 transition-colors">info@perfumeriaaero.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Column 4: Physical Location */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-black mb-6">Visítanos</h4>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-lg bg-gray-50/50 border border-transparent hover:border-gold/20 transition-colors">
                <Clock className="text-gold flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">HORARIO DE ATENCIÓN</p>
                  <p className="text-sm text-gray-600">Domingo - Domingo</p>
                  <p className="text-sm font-bold text-gray-900">9:00 am a 8:00 pm</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-lg bg-gray-50/50 border border-transparent hover:border-gold/20 transition-colors">
                <MapPin className="text-gold flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">UBICACIÓN</p>
                  <p className="text-sm text-gray-600">Cúcuta, Norte de Santander</p>
                  <p className="text-sm font-bold text-gray-900">Calle 2 # 11e-92 Quinta Oriental</p>
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
