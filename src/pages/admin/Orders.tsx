import { Search, Eye, Filter } from 'lucide-react';
import { useOrderStore, Order } from '../../store/orderStore';
import { useState } from 'react';

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useOrderStore();
  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'confirmed': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'shipped': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 'delivered': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'cancelled': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmado';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="pb-20 lg:pb-0">
      <h1 className="text-2xl font-bold text-white mb-8">Gestión de Pedidos</h1>

      {/* Filters */}
      <div className="bg-[#121212] border border-white/5 p-4 rounded-lg mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Buscar pedido por ID o cliente..." 
            className="w-full bg-black/50 border border-white/10 text-white pl-10 pr-4 py-2 rounded focus:border-gold/50 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select 
            className="bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todos los Estados</option>
            <option value="pending">Pendiente</option>
            <option value="confirmed">Confirmado</option>
            <option value="shipped">Enviado</option>
            <option value="delivered">Entregado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#121212] border border-white/5 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400 uppercase tracking-wider font-medium">
              <tr>
                <th className="px-6 py-4">ID Pedido</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-gold font-mono">#{order.id.slice(0, 8)}</td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-white font-bold">${order.total.toLocaleString('es-CO')}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        className="bg-black/50 border border-white/10 text-xs text-white px-2 py-1 rounded focus:border-gold/50 focus:outline-none mr-2"
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="confirmed">Confirmado</option>
                        <option value="shipped">Enviado</option>
                        <option value="delivered">Entregado</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No hay pedidos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
