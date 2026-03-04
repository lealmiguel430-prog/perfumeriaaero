import { Search, User, Heart, ShoppingCart, Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const { items, total, toggleCart } = useCartStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

  if (user?.role === 'admin') {
    navLinks.push({ name: 'ADMIN', path: '/admin/dashboard' });
  }

  return (
    <header className="bg-[#121212] border-b border-gold/20 sticky top-0 z-50 shadow-lg shadow-black/50">
      <div className="container-custom py-6">
        <div className="flex items-center justify-between">
          
          {/* Logo - Left Aligned */}
          <Link to="/" className="flex-shrink-0 flex flex-col items-center group">
             <div className="relative">
                <img src="./logo.png" alt="AERO PERFUMES" className="h-16 md:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300" />
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
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 hover:text-gold transition-colors py-2">
                  <User size={20} strokeWidth={1.5} />
                  <span className="text-xs font-bold uppercase max-w-[100px] truncate hidden sm:block">
                    {user.name}
                  </span>
                  <ChevronDown size={12} className="hidden sm:block" />
                </button>
                {/* User Dropdown */}
                <div className="absolute right-0 mt-0 w-48 bg-[#1A2220] border border-gold/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gold/10 mb-1">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Conectado como</p>
                      <p className="text-xs text-gold font-bold truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-xs text-gray-300 hover:bg-gold/10 hover:text-gold transition-colors uppercase tracking-wider"
                    >
                      Mi Perfil / Pedidos
                    </Link>
                    {user.role === 'admin' && (
                       <Link 
                        to="/admin/dashboard" 
                        className="block px-4 py-2 text-xs text-gold hover:bg-gold/10 hover:text-gold-light transition-colors uppercase tracking-wider font-bold"
                      >
                        Panel Admin
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors uppercase tracking-wider flex items-center gap-2 mt-1 border-t border-white/5 pt-2"
                    >
                      <LogOut size={14} />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hover:text-gold transition-colors flex items-center gap-2">
                <User size={20} strokeWidth={1.5} />
              </Link>
            )}

            {/* Admin Button for better visibility */}
            {user?.role === 'admin' && (
              <Link to="/admin/dashboard" className="hidden lg:flex items-center justify-center text-[10px] font-bold text-black bg-gold px-2 py-1 rounded hover:bg-white transition-colors uppercase tracking-wider ml-2">
                ADMIN
              </Link>
            )}

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
        <div className={`xl:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className={`flex flex-col h-full pt-24 px-6 transition-transform duration-300 ${isMenuOpen ? 'translate-y-0' : '-translate-y-10'}`}>
            <button 
              className="absolute top-6 right-6 text-gold p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between">
                    <Link 
                      to={link.path} 
                      className="text-xl font-serif text-cream hover:text-gold uppercase tracking-widest" 
                      onClick={() => !link.subItems && setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.subItems && (
                      <button onClick={() => toggleSubMenu(link.name)} className="text-gold p-2">
                        <ChevronDown size={20} className={`transform transition-transform ${openSubMenu === link.name ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  
                  {link.subItems && openSubMenu === link.name && (
                    <div className="mt-4 pl-4 space-y-3 border-l border-gold/30">
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
