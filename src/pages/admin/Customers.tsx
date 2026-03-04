import { Search, Mail, ShoppingBag } from 'lucide-react';
import { useOrderStore } from '../../store/orderStore';

const AdminCustomers = () => {
  const { orders } = useOrderStore();

  // Derive customers from orders
  const customers = Array.from(new Set(orders.map(o => o.userId))).map(userId => {
    const userOrders = orders.filter(o => o.userId === userId);
    const lastOrder = userOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    return {
      id: userId,
      name: lastOrder.customerName,
      email: lastOrder.customerEmail,
      totalOrders: userOrders.length,
      totalSpent: userOrders.reduce((acc, o) => acc + o.total, 0),
      lastOrderDate: lastOrder.date
    };
  });

  return (
    <div className="pb-20 lg:pb-0">
      <h1 className="text-2xl font-bold text-white mb-8">Gestión de Clientes</h1>

      <div className="bg-[#121212] border border-white/5 p-4 rounded-lg mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Buscar cliente por nombre o email..." 
            className="w-full bg-black/50 border border-white/10 text-white pl-10 pr-4 py-2 rounded focus:border-gold/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-[#121212] border border-white/5 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-gray-400 uppercase tracking-wider font-medium">
            <tr>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Pedidos</th>
              <th className="px-6 py-4">Total Gastado</th>
              <th className="px-6 py-4">Última Compra</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xs">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-medium">{customer.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Mail size={10} /> {customer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{customer.totalOrders}</td>
                  <td className="px-6 py-4 text-white font-medium">${customer.totalSpent.toLocaleString('es-CO')}</td>
                  <td className="px-6 py-4 text-gray-400">{new Date(customer.lastOrderDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gold hover:underline text-xs">Ver Historial</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No hay clientes registrados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
