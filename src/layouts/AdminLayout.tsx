import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Percent, 
  ClipboardList, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Users
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Productos', path: '/admin/products', icon: Package },
    { name: 'Categorías', path: '/admin/categories', icon: Tags },
    { name: 'Pedidos', path: '/admin/orders', icon: ClipboardList },
    { name: 'Clientes', path: '/admin/customers', icon: Users }, // Changed icon import needed
    { name: 'Configuración', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#090909] flex relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#121212] border-r border-white/5 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-white/5 flex flex-col items-center">
            <img src="./logo.png" alt="Aero Perfumería" className="h-16 w-auto mb-2" />
            <span className="text-gold font-serif font-bold tracking-[0.2em] text-xs">ADMINISTRACIÓN</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-gold/10 text-gold border border-gold/20' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xs">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Administrador</p>
                <p className="text-xs text-gray-500 truncate">admin@aero.com</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
            >
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-[#121212] border-b border-white/5 lg:hidden p-4 flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400">
            <Menu size={24} />
          </button>
          <span className="text-gold font-serif font-bold">AERO ADMIN</span>
          <div className="w-6"></div> {/* Spacer */}
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;