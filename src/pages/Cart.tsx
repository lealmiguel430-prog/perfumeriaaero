import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="bg-[#1A2220] p-8 rounded-full mb-6 border border-gold/20">
          <ShoppingBag size={64} className="text-gold/50" />
        </div>
        <h2 className="text-3xl font-serif text-cream mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-400 mb-8 max-w-md text-center">
          Parece que aún no has agregado ninguna fragancia a tu colección.
        </p>
        <Link to="/" className="btn-primary">
          Explorar Perfumes
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-8 pb-20">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-serif text-cream mb-8 border-b border-gold/10 pb-4">
          Tu Carrito
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-[#1A2220] p-6 border border-gold/10 rounded-sm">
                {/* Image */}
                <div className="w-full sm:w-24 h-24 bg-white/5 flex-shrink-0 overflow-hidden rounded-sm">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-serif text-cream">
                      <Link to={`/producto/${item.id}`} className="hover:text-gold transition-colors">
                        {item.name}
                      </Link>
                    </h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-gold/80 text-xs uppercase tracking-widest mb-4">{item.category}</p>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-gold/20 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-2 text-gray-400 hover:text-gold hover:bg-white/5 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-cream font-medium text-sm">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-400 hover:text-gold hover:bg-white/5 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-gold font-bold text-lg">
                        ${(item.price * item.quantity).toLocaleString('es-CO')}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-gray-500 text-xs">
                          ${item.price.toLocaleString('es-CO')} c/u
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1A2220] p-8 border border-gold/10 sticky top-24">
              <h3 className="text-xl font-serif text-cream mb-6">Resumen del Pedido</h3>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${total().toLocaleString('es-CO')}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Envío</span>
                  <span className="text-gold">Gratis</span>
                </div>
              </div>
              
              <div className="border-t border-gold/10 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-cream">Total</span>
                  <span className="text-2xl font-bold text-gold">
                    ${total().toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-gold hover:bg-gold-light text-black font-bold py-4 uppercase tracking-widest text-sm transition-all hover:shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2 group"
              >
                {isAuthenticated ? 'Finalizar Compra' : 'Iniciar Sesión para Comprar'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              {!isAuthenticated && (
                <p className="text-center mt-4 text-xs text-gray-500">
                  Debes registrarte o iniciar sesión para completar tu compra.
                </p>
              )}
              
              <div className="mt-8 text-xs text-gray-500 text-center space-y-2">
                <p>Aceptamos todos los medios de pago</p>
                <div className="flex justify-center gap-2 opacity-50">
                  {/* Payment icons placeholders */}
                  <div className="w-8 h-5 bg-white/10 rounded"></div>
                  <div className="w-8 h-5 bg-white/10 rounded"></div>
                  <div className="w-8 h-5 bg-white/10 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
