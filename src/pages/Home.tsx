import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import FeaturedProducts from '@/components/home/FeaturedProducts';

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      
      {/* Promotional Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#1A2220] to-[#121212] z-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
        
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-4xl mx-auto border border-gold/30 p-12 md:p-20 bg-black/40 backdrop-blur-sm rounded-sm relative">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold"></div>
            
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark">Usa Tu Descuento</h2>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-300 font-light leading-relaxed">
              Regístrate hoy y obtén un <span className="text-gold font-bold">15% de descuento</span> en tu primera compra. Descubre el aroma que define tu personalidad.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="btn-primary">
                Registrarse
              </button>
              <button className="btn-outline">
                Ver Ofertas
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
