import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Luxury%20gold%20perfume%20bottle%20on%20dark%20charcoal%20textured%20background%2C%20dramatic%20lighting%2C%20golden%20reflections%2C%20premium%20advertising%20photography&image_size=landscape_16_9" 
          alt="Luxury Perfume" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-dark/90 via-charcoal-dark/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center md:text-left">
        <div className="max-w-3xl">
          <span className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-6 block animate-fade-in-up border-l-4 border-gold pl-4">
            Nueva Colección 2026
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream mb-8 leading-tight animate-fade-in-up delay-100 drop-shadow-lg">
            Fragancias que <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark italic font-light">Cuentan Tu Historia</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-lg animate-fade-in-up delay-200 leading-relaxed font-light">
            Descubre nuestra exclusiva selección de perfumes artesanales diseñados para evocar emociones y crear recuerdos inolvidables.
          </p>
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/tienda" className="btn-primary inline-block transform hover:-translate-y-1 transition-transform duration-300">
              Comprar Ahora
            </Link>
            <Link to="/sobre-nosotros" className="btn-outline inline-block transform hover:-translate-y-1 transition-transform duration-300">
              Descubrir Más
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
