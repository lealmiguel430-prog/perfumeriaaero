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
  // Use discount from product prop if available, otherwise fallback to mock logic
  const discountPercent = product.discount || 0;
  const hasDiscount = discountPercent > 0;
  const originalPrice = price; // Current price is the discounted price in our model, or we can adjust logic
  // Typically: price = final price. If discount, original = price / (1 - discount/100)
  const displayOriginalPrice = hasDiscount ? Math.round(price / (1 - discountPercent / 100)) : price;

  return (
    <div className="group relative card-surface hover-elevate flex flex-col h-full animate-fade-in-up">
      
      {/* Image Container */}
      <div className="aspect-[3/4] overflow-hidden relative">
        <Link to={`/producto/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        
        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
          {hasDiscount && (
            <span className="bg-[#D9534F] text-white text-[10px] font-bold px-2 py-1 shadow-md backdrop-blur-sm bg-opacity-90">
              -{discountPercent}% OFF
            </span>
          )}
          {isNew && (
            <span className="bg-gold text-black text-[10px] font-bold px-2 py-1 shadow-md">
              Nuevo
            </span>
          )}
        </div>

        {/* Action Icons Overlay - Appears on Hover */}
        <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20 px-4">
          
          <button 
            onClick={() => addToCart(product)}
            className="w-10 h-10 bg-black/80 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-all duration-300 rounded-full"
            title="Añadir al Carrito"
          >
            <ShoppingBag size={16} />
          </button>
          
          <button 
            className="w-10 h-10 bg-black/80 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-all duration-300 rounded-full delay-75"
            title="Vista Rápida"
          >
            <Search size={16} />
          </button>
          
          <button 
            className="w-10 h-10 bg-black/80 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-all duration-300 rounded-full delay-100"
            title="Añadir a Deseos"
          >
            <Heart size={16} />
          </button>

        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col items-center text-center flex-grow bg-[#121212] relative z-10">
        <p className="text-[10px] text-gold/80 uppercase tracking-widest mb-2">{category}</p>
        <h3 className="text-sm font-medium text-white mb-3 hover:text-gold transition-colors line-clamp-2 min-h-[40px] font-serif tracking-wide">
          <Link to={`/producto/${id}`}>{name}</Link>
        </h3>
        
        {/* Price Block */}
        <div className="mt-auto mb-4 flex items-center gap-3 justify-center">
          {hasDiscount && (
            <span className="text-xs text-gray-500 line-through">
              ${displayOriginalPrice.toLocaleString('es-CO')}
            </span>
          )}
          <span className={`text-lg font-bold ${hasDiscount ? 'text-[#D9534F]' : 'text-gold'}`}>
            ${price.toLocaleString('es-CO')}
          </span>
        </div>
        
        <div className="w-full">
           
           {/* Mobile Add to Cart Button */}
           <button 
             onClick={() => addToCart(product)}
             className="w-full btn-outline lg:hidden flex items-center justify-center gap-2"
           >
             <ShoppingBag size={14} />
             Agregar
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
