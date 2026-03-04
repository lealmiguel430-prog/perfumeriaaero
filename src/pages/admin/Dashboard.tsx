import { DollarSign, Package, ShoppingBag, Users } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { name: 'Ventas Totales', value: '$12.500.000', icon: DollarSign, change: '+12%', color: 'text-green-500' },
    { name: 'Productos Activos', value: '145', icon: Package, change: '+4', color: 'text-blue-500' },
    { name: 'Pedidos Pendientes', value: '12', icon: ShoppingBag, change: '-2', color: 'text-orange-500' },
    { name: 'Clientes Nuevos', value: '24', icon: Users, change: '+18%', color: 'text-purple-500' },
  ];

  return (
    <div>
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
                <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.name}</h3>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#121212] border border-white/5 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-white mb-4">Últimos Pedidos</h3>
          <div className="text-gray-400 text-sm text-center py-8">
            No hay pedidos recientes para mostrar.
          </div>
        </div>
        
        <div className="bg-[#121212] border border-white/5 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-white mb-4">Productos con Bajo Stock</h3>
          <div className="text-gray-400 text-sm text-center py-8">
            Todos los productos tienen stock suficiente.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;