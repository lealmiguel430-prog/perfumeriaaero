import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { ArrowLeft, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { addOrder } = useOrderStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [shippingData, setShippingData] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Tu carrito está vacío</h2>
        <Link to="/" className="text-gold hover:underline">Volver a la tienda</Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newOrder = {
        id: Date.now().toString(),
        userId: user?.id || 'guest',
        customerName: user?.name || 'Invitado',
        customerEmail: user?.email || 'guest@example.com',
        items: items.map(item => ({
          id: item.id.toString(), // Ensure string
          productId: item.id.toString(),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total: total(),
        status: 'pending' as const,
        date: new Date().toISOString(),
        paymentMethod
      };

      addOrder(newOrder);
      clearCart();
      setLoading(false);
      setStep(3); // Success step
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">¡Pedido Confirmado!</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          Gracias por tu compra. Hemos recibido tu pedido y lo procesaremos a la brevedad.
        </p>
        <div className="flex gap-4">
          <Link to="/profile" className="btn-primary px-6 py-3">
            Ver mis Pedidos
          </Link>
          <Link to="/" className="px-6 py-3 border border-white/10 rounded hover:bg-white/5 transition-colors text-white">
            Seguir Comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <Link to="/carrito" className="inline-flex items-center text-gray-400 hover:text-gold mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Volver al Carrito
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Forms */}
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-gold text-black' : 'bg-white/10 text-gray-400'}`}>1</div>
              <h2 className={`text-xl font-bold ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>Información de Envío</h2>
            </div>
            
            {step === 1 && (
              <div className="space-y-4 pl-12">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Dirección Completa</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#1A2220] border border-gold/10 rounded p-3 text-white focus:border-gold/50 focus:outline-none"
                    value={shippingData.address}
                    onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Ciudad</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#1A2220] border border-gold/10 rounded p-3 text-white focus:border-gold/50 focus:outline-none"
                      value={shippingData.city}
                      onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Departamento</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#1A2220] border border-gold/10 rounded p-3 text-white focus:border-gold/50 focus:outline-none"
                      value={shippingData.state}
                      onChange={(e) => setShippingData({...shippingData, state: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Teléfono</label>
                    <input 
                      type="tel" 
                      className="w-full bg-[#1A2220] border border-gold/10 rounded p-3 text-white focus:border-gold/50 focus:outline-none"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="mt-4 btn-primary w-full py-3"
                  disabled={!shippingData.address || !shippingData.city}
                >
                  Continuar al Pago
                </button>
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-gold text-black' : 'bg-white/10 text-gray-400'}`}>2</div>
              <h2 className={`text-xl font-bold ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>Método de Pago</h2>
            </div>

            {step === 2 && (
              <div className="space-y-4 pl-12">
                <div 
                  className={`p-4 border rounded cursor-pointer flex items-center gap-4 transition-colors ${paymentMethod === 'credit_card' ? 'border-gold bg-gold/5' : 'border-white/10 bg-[#1A2220]'}`}
                  onClick={() => setPaymentMethod('credit_card')}
                >
                  <CreditCard className={paymentMethod === 'credit_card' ? 'text-gold' : 'text-gray-400'} />
                  <div>
                    <p className="text-white font-medium">Tarjeta de Crédito / Débito</p>
                    <p className="text-xs text-gray-500">Procesado seguramente por Stripe</p>
                  </div>
                </div>

                <div 
                  className={`p-4 border rounded cursor-pointer flex items-center gap-4 transition-colors ${paymentMethod === 'cod' ? 'border-gold bg-gold/5' : 'border-white/10 bg-[#1A2220]'}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <Truck className={paymentMethod === 'cod' ? 'text-gold' : 'text-gray-400'} />
                  <div>
                    <p className="text-white font-medium">Pago Contra Entrega</p>
                    <p className="text-xs text-gray-500">Paga en efectivo al recibir</p>
                  </div>
                </div>

                <button 
                  onClick={handlePlaceOrder}
                  className="mt-6 btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : `Pagar $${total().toLocaleString('es-CO')}`}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-[#1A2220] p-8 border border-gold/10 h-fit rounded-lg sticky top-24">
          <h3 className="text-xl font-serif text-cream mb-6">Resumen de Compra</h3>
          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 bg-white/5 rounded overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium line-clamp-1">{item.name}</p>
                  <p className="text-gray-500 text-xs">Cant: {item.quantity}</p>
                  <p className="text-gold text-sm font-bold">${(item.price * item.quantity).toLocaleString('es-CO')}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gold/10 pt-4 space-y-2">
            <div className="flex justify-between text-gray-400 text-sm">
              <span>Subtotal</span>
              <span>${total().toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm">
              <span>Envío</span>
              <span className="text-gold">Gratis</span>
            </div>
            <div className="flex justify-between text-white font-bold text-lg pt-2">
              <span>Total</span>
              <span>${total().toLocaleString('es-CO')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
