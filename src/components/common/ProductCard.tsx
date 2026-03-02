import { Heart, ShoppingBag, Eye, RefreshCw, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore, Product } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { id, name, price, image, category, type } = product;

  // Mock logic for badges
  const isNew = false;
  // Deterministic "random" discount for demo purposes based on ID
  const hasDiscount = id % 3 === 0;
  const discountPercent = 13;
  const originalPrice = hasDiscount ? Math.round(price * (1 + discountPercent / 100)) : price;

  return (
    <div className="group relative bg-white rounded-sm overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Image Container */}
      <div className="aspect-[3/4] overflow-hidden relative bg-gray-50">
        <Link to={`/producto/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
          {hasDiscount && (
            <span className="bg-[#D9534F] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
              -{discountPercent}%
            </span>
          )}
          {isNew && (
            <span className="bg-gold text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
              Nuevo
            </span>
          )}
        </div>

        {/* Action Icons Overlay - Appears on Hover */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20 px-4">
          
          <button 
            onClick={() => addToCart(product)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gold hover:text-white shadow-lg transition-colors tooltip-trigger"
            title="Añadir al Carrito"
          >
            <ShoppingBag size={18} />
          </button>
          
          <button 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gold hover:text-white shadow-lg transition-colors"
            title="Vista Rápida"
          >
            <Search size={18} />
          </button>
          
          <button 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gold hover:text-white shadow-lg transition-colors"
            title="Comparar"
          >
            <RefreshCw size={18} />
          </button>
          
          <button 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-red-500 hover:text-white shadow-lg transition-colors"
            title="Añadir a Deseos"
          >
            <Heart size={18} />
          </button>

        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col items-center text-center flex-grow bg-white">
        <h3 className="text-sm font-medium text-gray-800 mb-1 hover:text-gold transition-colors line-clamp-2 min-h-[40px]">
          <Link to={`/producto/${id}`}>{name}</Link>
        </h3>
        
        {/* Price Block */}
        <div className="mt-2 mb-3 flex items-center gap-2 justify-center">
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              ${originalPrice.toLocaleString('es-CO')}
            </span>
          )}
          <span className={`text-lg font-bold ${hasDiscount ? 'text-[#D9534F]' : 'text-gray-900'}`}>
            ${price.toLocaleString('es-CO')}
          </span>
        </div>
        
        <div className="mt-auto flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
           <span className="w-2 h-2 rounded-full bg-gold"></span>
           <span>1 Opción disponible</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
