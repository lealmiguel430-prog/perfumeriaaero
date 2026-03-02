import { Search, User, Heart, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const { items, total, toggleCart } = useCartStore();
  
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const toggleSubMenu = (menu: string) => {
    if (openSubMenu === menu) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(menu);
    }
  };

  const navLinks = [
    { name: 'INICIO', path: '/' },
    { name: 'NUEVOS LANZAMIENTOS', path: '/mujer?type=nicho' }, // Mapping to something relevant
    { 
      name: 'FAMILIAS OLFATIVAS', 
      path: '#',
      subItems: [
        { name: 'Amaderado', path: '/mujer?type=diseñador' },
        { name: 'Cítrico', path: '/hombre?type=diseñador' },
        { name: 'Floral', path: '/mujer?type=diseñador' },
        { name: 'Oriental', path: '/hombre?type=arabe' },
      ]
    },
    { 
      name: 'PERFUMES', 
      path: '/tienda',
      subItems: [
        { name: 'Mujer', path: '/mujer' },
        { name: 'Hombre', path: '/hombre' },
        { name: 'Unisex', path: '/mujer?type=nicho' },
      ]
    },
    { name: 'CATALOGO', path: '/tienda' },
    { name: 'OFERTAS', path: '/mujer?type=fragancia' },
  ];

  return (
    <header className="bg-[#121212] border-b border-gold/20 sticky top-0 z-50 shadow-lg shadow-black/50">
      {/* Top Bar */}
      <div className="bg-black text-white text-[10px] py-1 text-center border-b border-white/10 overflow-hidden">
        <div className="flex justify-between px-4 container-custom">
           <span className="tracking-widest uppercase font-bold">ENVÍO GRATIS A TODA COLOMBIA</span>
           <span className="tracking-widest uppercase font-bold hidden sm:inline">ENVÍO GRATIS A TODA COLOMBIA</span>
           <span className="tracking-widest uppercase font-bold hidden md:inline">ENVÍO GRATIS A TODA COLOMBIA</span>
        </div>
      </div>

      <div className="container-custom py-6">
        <div className="flex items-center justify-between">
          
          {/* Logo - Left Aligned */}
          <Link to="/" className="flex-shrink-0 flex flex-col items-center group">
             <div className="relative">
                <img src="/logo.png" alt="AERO PERFUMES" className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-300" />
             </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden xl:flex items-center justify-center space-x-6">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  to={link.path} 
                  className="text-xs font-bold text-cream hover:text-gold transition-colors uppercase tracking-widest flex items-center gap-1 py-2"
                >
                  {link.name}
                  {link.subItems && <ChevronDown size={12} />}
                </Link>
                
                {/* Dropdown */}
                {link.subItems && (
                  <div className="absolute left-0 mt-0 w-48 bg-[#1A2220] border border-gold/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="py-2">
                      {link.subItems.map((subItem) => (
                        <Link 
                          key={subItem.name} 
                          to={subItem.path} 
                          className="block px-4 py-2 text-xs text-gray-300 hover:bg-gold/10 hover:text-gold transition-colors uppercase tracking-wider"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Icons - Right Aligned */}
          <div className="flex items-center space-x-4 md:space-x-6 text-cream">
            <button className="hover:text-gold transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link to="/login" className="hover:text-gold transition-colors hidden sm:block">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <Link to="/favoritos" className="hover:text-gold transition-colors hidden sm:block">
              <Heart size={20} strokeWidth={1.5} />
            </Link>
            <button 
              onClick={toggleCart}
              className="hover:text-gold transition-colors flex items-center gap-2 group"
            >
              <div className="relative">
                <ShoppingCart size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gold text-black text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium group-hover:text-gold transition-colors hidden sm:block">
                $ {total().toLocaleString('es-CO')}
              </span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="xl:hidden text-gold ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="xl:hidden mt-4 pb-4 border-t border-gold/10 pt-4 flex flex-col space-y-2 bg-[#121212]">
            {navLinks.map((link) => (
              <div key={link.name}>
                <div className="flex items-center justify-between px-4 py-2">
                  <Link 
                    to={link.path} 
                    className="text-sm font-bold text-cream hover:text-gold uppercase tracking-widest" 
                    onClick={() => !link.subItems && setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.subItems && (
                    <button onClick={() => toggleSubMenu(link.name)} className="text-gold p-1">
                      <ChevronDown size={16} className={`transform transition-transform ${openSubMenu === link.name ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                
                {link.subItems && openSubMenu === link.name && (
                  <div className="bg-[#1A2220] py-2 px-6 space-y-2">
                    {link.subItems.map((subItem) => (
                      <Link 
                        key={subItem.name} 
                        to={subItem.path} 
                        className="block text-sm text-gray-400 hover:text-gold py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
