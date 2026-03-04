import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="./hero-video.mp4" type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent/10"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center md:text-left h-full flex items-center">
        <div className="max-w-4xl pt-20 md:pt-0 mx-auto md:mx-0">
          <div className="inline-block mb-6 relative group cursor-default">
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] md:text-sm font-bold block animate-fade-in-up border-l-2 border-gold pl-4 py-1 bg-black/40 backdrop-blur-md rounded-r-sm">
              Nueva Colección 2026
            </span>
            <div className="absolute -bottom-2 left-0 w-1/2 h-[1px] bg-gold transition-all duration-500 group-hover:w-full"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-cream mb-8 leading-[1.1] animate-fade-in-up delay-100 drop-shadow-2xl">
            Fragancias que <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2D27A] via-[#D4AF37] to-[#A8792A] italic font-light relative">
              Cuentan Tu Historia
            </span>
          </h1>
          
          <p className="text-gray-200 text-sm md:text-lg mb-10 max-w-lg animate-fade-in-up delay-200 leading-relaxed font-light mx-auto md:mx-0 bg-black/30 backdrop-blur-sm p-4 border-l border-gold/20 rounded-r-lg">
            Descubre nuestra exclusiva selección de perfumes artesanales diseñados para evocar emociones y crear recuerdos inolvidables.
          </p>
          
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-6 justify-center md:justify-start px-6 md:px-0">
            <Link to="/tienda" className="btn-primary text-center group">
              <span className="relative z-10">Comprar Ahora</span>
            </Link>
            <Link to="/sobre-nosotros" className="btn-outline text-center bg-black/20">
              Descubrir Más
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;