import { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const CartDrawer = () => {
  const { isOpen, toggleCart, items, removeFromCart, updateQuantity, total } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    toggleCart(); // Close drawer
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  const handleViewCart = () => {
    toggleCart();
    navigate('/carrito');
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-[#121212] border-l border-gold/20 shadow-2xl z-[70] transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#1A2220]">
          <h2 className="text-xl font-serif text-cream">Tu Carrito</h2>
          <button 
            onClick={toggleCart}
            className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold"
          >
            <X size={20} />
            Cerrar
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                <ShoppingBag size={40} className="text-gold/30" />
              </div>
              <div>
                <p className="text-lg text-cream font-medium mb-2">No hay productos en el carrito</p>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                  Agrega tus fragancias favoritas para comenzar tu compra.
                </p>
              </div>
              <button 
                onClick={toggleCart}
                className="btn-primary"
              >
                Regresar a la Tienda
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-sm border border-white/5">
                  <div className="w-20 h-20 bg-white/5 rounded-sm overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold text-cream line-clamp-2 pr-4">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-gold text-sm font-bold">${item.price.toLocaleString('es-CO')}</p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-white/20 rounded-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-white/10 text-gray-400 hover:text-white"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-white/10 text-gray-400 hover:text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-[#1A2220] border-t border-white/10 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold text-cream">
              <span>Subtotal:</span>
              <span className="text-gold">${total().toLocaleString('es-CO')}</span>
            </div>
            <p className="text-xs text-gray-500 text-center">Impuestos incluidos. Envío calculado al finalizar.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleViewCart}
                className="btn-outline w-full text-center flex justify-center items-center"
              >
                Ver Carrito
              </button>
              <button 
                onClick={handleCheckout}
                className="btn-primary w-full text-center flex justify-center items-center gap-2"
              >
                Pagar <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
