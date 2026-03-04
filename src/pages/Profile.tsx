import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { Navigate, Link } from 'react-router-dom';
import { User, Package, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getOrdersByUser } = useOrderStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const orders = getOrdersByUser(user.id);

  return (
    <div className="container-custom py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-[#1A2220] border border-gold/10 rounded-lg p-6 text-center">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-gold font-serif">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-sm text-gray-400 mb-6">{user.email}</p>
            
            <button 
              onClick={logout}
              className="flex items-center justify-center gap-2 text-red-400 hover:text-red-300 w-full py-2 border border-red-500/20 rounded hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Package className="text-gold" /> Mis Pedidos
          </h1>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-[#1A2220] border border-gold/10 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Pedido <span className="text-white font-mono">#{order.id.slice(0, 8)}</span></p>
                      <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()} • {order.items.length} artículos</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        order.status === 'delivered' ? 'bg-green-500/10 text-green-500' :
                        order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                        {order.status === 'pending' ? 'Pendiente' : 
                         order.status === 'confirmed' ? 'Confirmado' :
                         order.status === 'shipped' ? 'Enviado' :
                         order.status === 'delivered' ? 'Entregado' : order.status}
                      </span>
                      <p className="text-xl font-bold text-gold">${order.total.toLocaleString('es-CO')}</p>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                      {order.items.map((item) => (
                        <div key={item.id} className="w-16 h-16 bg-white/5 rounded flex-shrink-0 overflow-hidden relative group">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 right-0 bg-black/70 text-white text-[10px] px-1">x{item.quantity}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#1A2220] border border-gold/10 rounded-lg p-12 text-center">
              <Package size={48} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No tienes pedidos aún</h3>
              <p className="text-gray-400 mb-6">Cuando realices una compra, aparecerá aquí.</p>
              <Link to="/" className="btn-primary inline-block">
                Ir a la Tienda
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
