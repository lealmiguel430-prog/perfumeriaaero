import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { 
  Minus, 
  Plus, 
  Heart, 
  RefreshCw, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Eye,
  ChevronRight,
  ChevronLeft,
  Maximize2
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(products[0]); // Default init
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [viewCount, setViewCount] = useState(20);
  
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(foundProduct.image);
    }
    // Randomize view count slightly for "live" feel
    setViewCount(Math.floor(Math.random() * (30 - 15 + 1)) + 15);
  }, [id]);

  if (!product) return <div className="p-20 text-center">Producto no encontrado</div>;

  // Mock discount logic
  const hasDiscount = product.id % 3 === 0;
  const discountPercent = 13;
  const originalPrice = hasDiscount ? Math.round(product.price * (1 + discountPercent / 100)) : product.price;

  // Mock thumbnails (using same image for demo)
  const images = [product.image, product.image, product.image];

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container-custom pt-8 pb-12">
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-500 mb-8 flex items-center gap-2 uppercase tracking-wide">
          <Link to="/" className="hover:text-gold">Inicio</Link> 
          <span>/</span>
          <Link to={`/${product.category}`} className="hover:text-gold">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column - Images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 border ${activeImage === img ? 'border-gold' : 'border-gray-200'} rounded-sm overflow-hidden hover:border-gold transition-colors`}
                >
                  <img src={img} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-grow relative bg-gray-50 rounded-sm overflow-hidden border border-gray-100 group">
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
              {hasDiscount && (
                <span className="absolute top-4 right-4 bg-[#D9534F] text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{discountPercent}%
                </span>
              )}
              <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 hover:text-gold">
                <Maximize2 size={20} />
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              {hasDiscount && (
                <span className="text-gray-400 line-through text-xl">
                  ${originalPrice.toLocaleString('es-CO')}
                </span>
              )}
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toLocaleString('es-CO')}
              </span>
            </div>

            {/* Payment Options Mock */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 p-3 border border-blue-100 rounded-lg bg-blue-50/30">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs">S</div>
                <div className="text-xs text-gray-700">
                  Compra con <span className="font-bold text-blue-600">sistecrédito</span> en 6 cuotas de ${(product.price / 6).toLocaleString('es-CO', { maximumFractionDigits: 0 })}/mensual. <a href="#" className="underline text-blue-600">Solicita tu cupo.</a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-blue-100 rounded-lg bg-blue-50/30">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">A</div>
                <div className="text-xs text-gray-700">
                  Paga con <span className="font-bold text-blue-600">Addi</span> en <span className="font-bold">hasta 6 cuotas</span>. <a href="#" className="underline text-blue-600">Pide un cupo</a>
                </div>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <input 
                  type="text" 
                  value={quantity} 
                  readOnly 
                  className="w-12 h-12 text-center border-x border-gray-300 text-gray-900 font-bold focus:outline-none"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button 
                onClick={() => {
                  for(let i = 0; i < quantity; i++) addToCart(product);
                }}
                className="flex-grow bg-black text-white font-bold uppercase tracking-widest text-xs py-3 px-6 hover:bg-gray-800 transition-colors"
              >
                Añadir al Carrito
              </button>

              <button className="flex-grow bg-black text-white font-bold uppercase tracking-widest text-xs py-3 px-6 hover:bg-gray-800 transition-colors">
                Comprar Ahora
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-6 mb-8 text-sm text-gray-500">
              <button className="flex items-center gap-2 hover:text-gold transition-colors">
                <RefreshCw size={16} /> Comparar
              </button>
              <button className="flex items-center gap-2 hover:text-gold transition-colors">
                <Heart size={16} /> Añadir a la lista de deseos
              </button>
            </div>

            {/* View Counter */}
            <div className="bg-gray-100 p-3 mb-8 flex items-center gap-3 text-sm text-gray-600 rounded-sm">
              <Eye size={18} />
              <span><span className="font-bold">{viewCount}</span> ¡Personas viendo este producto ahora!</span>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase">Sobre envío</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Los pedidos se procesan en menos de 24 horas después de confirmado el pago y en la medida de lo posible se envían el mismo día o al siguiente día hábil, el tiempo de entregar es normalmente de 2 a 3 días hábiles 🤩 Tenemos todas las transportadoras disponibles Coordinadora, Interrapidisimo, Envía y Servientrega (Si quieres que lo enviemos con alguna transportadora en especifico por favor háznoslo saber) Tan pronto tengamos la guía de tu pedido te la enviaremos por WhatsApp al número que dejes registrado al momento de hacer tu pedido.
              </p>
            </div>

            {/* Meta */}
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex gap-2">
                <span className="font-bold text-gray-900">Categorías:</span>
                <span className="capitalize">{product.category}, {product.type}, General</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-bold text-gray-900">Compartir:</span>
                <div className="flex gap-3">
                  <a href="#" className="hover:text-gold"><Facebook size={16} /></a>
                  <a href="#" className="hover:text-gold"><Twitter size={16} /></a>
                  <a href="#" className="hover:text-gold"><Linkedin size={16} /></a>
                  <a href="#" className="hover:text-gold"><Share2 size={16} /></a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
