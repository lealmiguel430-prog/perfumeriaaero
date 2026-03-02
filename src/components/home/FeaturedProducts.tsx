import ProductCard from '../common/ProductCard';
import { Product } from '@/store/cartStore';

// Mock data matching Product interface
const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Eternity Rose',
    price: 120000,
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Rose%20scented%20perfume%20bottle%2C%20dark%20background%2C%20gold%20details%2C%20moody%20floral%2C%20cinematic&image_size=portrait_4_3',
    category: 'mujer',
    type: 'diseñador',
    description: 'Elegancia atemporal en cada gota.'
  },
  {
    id: 2,
    name: 'Midnight Oud',
    price: 180000,
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Dark%20oud%20perfume%20bottle%2C%20gold%20cap%2C%20black%20velvet%20background%2C%20mysterious%20atmosphere&image_size=portrait_4_3',
    category: 'hombre',
    type: 'arabe',
    description: 'Misterio y poder en una fragancia intensa.'
  },
  {
    id: 3,
    name: 'Citrus Breeze',
    price: 95000,
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Fresh%20citrus%20perfume%20bottle%2C%20dark%20glass%2C%20water%20droplets%2C%20dramatic%20lighting&image_size=portrait_4_3',
    category: 'unisex',
    type: 'nicho',
    description: 'Frescura vibrante para espíritus libres.'
  },
  {
    id: 4,
    name: 'Velvet Amber',
    price: 145000,
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Amber%20colored%20perfume%20bottle%2C%20gold%20filigree%2C%20dark%20background%2C%20warm%20glow&image_size=portrait_4_3',
    category: 'mujer',
    type: 'nicho',
    description: 'Calidez envolvente y sofisticada.'
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-[#0B0B0B]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-3 block">Selección Exclusiva</span>
          <h2 className="text-3xl md:text-4xl font-serif text-cream mb-6">Productos Destacados</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Una selección curada de nuestras fragancias más exclusivas y populares del momento, diseñadas para quienes buscan distinción.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="btn-outline">Ver Toda la Colección</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
