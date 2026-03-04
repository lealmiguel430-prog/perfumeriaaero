import { DollarSign, Package, ShoppingBag, Users, AlertTriangle } from 'lucide-react';
import { useProductStore } from '../../store/productStore';
import { useOrderStore } from '../../store/orderStore';

const AdminDashboard = () => {
  const { products } = useProductStore();
  const { orders } = useOrderStore();

  // Calculate Stats
  const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
  const activeProducts = products.filter(p => p.status === 'active').length;
  const lowStockProducts = products.filter(p => p.stock < 5);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const uniqueCustomers = new Set(orders.map(o => o.userId)).size;

  const stats = [
    { name: 'Ventas Totales', value: `$${totalSales.toLocaleString('es-CO')}`, icon: DollarSign, change: 'Actualizado', color: 'text-green-500' },
    { name: 'Productos Activos', value: activeProducts.toString(), icon: Package, change: `${products.length} Total`, color: 'text-blue-500' },
    { name: 'Pedidos Pendientes', value: pendingOrders.toString(), icon: ShoppingBag, change: 'Requiere atención', color: 'text-orange-500' },
    { name: 'Clientes', value: uniqueCustomers.toString(), icon: Users, change: 'Registrados', color: 'text-purple-500' },
  ];

  return (
    <div className="pb-20 lg:pb-0">
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard General</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-[#121212] border border-white/5 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full bg-white/5 ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <span className="text-xs font-bold text-gray-500">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.name}</h3>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <div className="bg-[#121212] border border-white/5 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-yellow-500" size={20} />
            <h3 className="text-lg font-bold text-white">Alertas de Stock Bajo</h3>
          </div>
          
          {lowStockProducts.length > 0 ? (
            <div className="space-y-3">
              {lowStockProducts.slice(0, 5).map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="text-sm font-medium text-white">{product.name}</p>
                      <p className="text-xs text-gray-500">Stock actual: <span className="text-red-500 font-bold">{product.stock}</span></p>
                    </div>
                  </div>
                  <button className="text-xs bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded">
                    Reabastecer
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm text-center py-8">
              Todos los productos tienen stock suficiente.
            </div>
          )}
        </div>
        
        {/* Recent Orders */}
        <div className="bg-[#121212] border border-white/5 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-white mb-4">Últimos Pedidos</h3>
          {orders.length > 0 ? (
            <div className="space-y-3">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                  <div>
                    <p className="text-sm font-medium text-white">#{order.id.slice(0, 8)} - {order.customerName}</p>
                    <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gold">${order.total.toLocaleString('es-CO')}</p>
                    <span className="text-[10px] uppercase text-gray-400">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm text-center py-8">
              No hay pedidos recientes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
