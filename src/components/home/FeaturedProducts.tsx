import ProductCard from '../common/ProductCard';
import { useProductStore } from '@/store/productStore';

const FeaturedProducts = () => {
  const { products } = useProductStore();
  // Get first 4 products as featured
  const featuredProducts = products.slice(0, 4);

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
