import { useState } from 'react';
import { Save, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const AdminSettings = () => {
  const { maintenanceMode, setMaintenanceMode } = useAuthStore();
  
  const [storeInfo, setStoreInfo] = useState({
    name: 'Perfumería Aero',
    email: 'contacto@perfumeriaaero.com',
    phone: '+57 300 123 4567',
    address: 'Calle 2 # 11e-92 quinta oriental, Cúcuta'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to backend
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="pb-20 lg:pb-0">
      <h1 className="text-2xl font-bold text-white mb-8">Configuración del Sistema</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* General Settings */}
        <div className="bg-[#121212] border border-white/5 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4">
            Información de la Tienda
          </h2>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nombre de la Tienda</label>
              <input 
                type="text" 
                className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                value={storeInfo.name}
                onChange={(e) => setStoreInfo({...storeInfo, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Correo de Contacto</label>
              <input 
                type="email" 
                className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                value={storeInfo.email}
                onChange={(e) => setStoreInfo({...storeInfo, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Teléfono</label>
              <input 
                type="tel" 
                className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                value={storeInfo.phone}
                onChange={(e) => setStoreInfo({...storeInfo, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Dirección Física</label>
              <input 
                type="text" 
                className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                value={storeInfo.address}
                onChange={(e) => setStoreInfo({...storeInfo, address: e.target.value})}
              />
            </div>
            <button className="btn-primary w-full mt-4 flex items-center justify-center gap-2">
              <Save size={18} /> Guardar Cambios
            </button>
          </form>
        </div>

        {/* System Controls */}
        <div className="space-y-8">
          {/* Maintenance Mode */}
          <div className="bg-[#121212] border border-white/5 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${maintenanceMode ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                <AlertTriangle size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">Modo Mantenimiento</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Si activas este modo, la tienda pública mostrará una página de "En Mantenimiento" y solo los administradores podrán acceder.
                </p>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  <span className="ml-3 text-sm font-medium text-white">
                    {maintenanceMode ? 'Activado' : 'Desactivado'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-[#121212] border border-white/5 rounded-lg p-6 opacity-75">
            <h3 className="text-lg font-bold text-white mb-4">Métodos de Pago</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-black/30 rounded border border-white/5">
                <span className="text-sm text-white">Stripe / Tarjetas</span>
                <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">Activo</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/30 rounded border border-white/5">
                <span className="text-sm text-white">Contra Entrega</span>
                <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">Activo</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSettings;
