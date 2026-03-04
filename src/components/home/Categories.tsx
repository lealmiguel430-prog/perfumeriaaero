import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Mujer',
    slug: 'mujer',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Elegant%20gold%20feminine%20perfume%20bottle%20on%20black%20silk%2C%20moody%20lighting%2C%20luxury%20product%20photography&image_size=square',
  },
  {
    id: 2,
    name: 'Hombre',
    slug: 'hombre',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Masculine%20cologne%20dark%20glass%20bottle%20with%20gold%20details%2C%20leather%20texture%20background%2C%20noir%20style&image_size=square',
  },
  {
    id: 3,
    name: 'Unisex',
    slug: 'unisex',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Minimalist%20gold%20and%20black%20perfume%20bottle%2C%20architectural%20lighting%2C%20modern%20luxury&image_size=square',
  },
  {
    id: 4,
    name: 'Novedades',
    slug: 'novedades',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=New%20exclusive%20perfume%20launch%2C%20gold%20spotlight%20on%20dark%20background%2C%20sparkles%2C%20premium&image_size=square',
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-charcoal relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
      
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-3 block">Descubre Tu Estilo</span>
          <h2 className="text-3xl md:text-4xl font-serif text-cream mb-4">Explora por Categoría</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/tienda?category=${category.slug}`}
              className="group relative h-96 overflow-hidden border border-white/10 hover:border-gold/50 transition-colors duration-500"
            >
              {/* Image Background */}
              <div className="absolute inset-0">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-90 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-gold transition-colors">
                    {category.name}
                  </h3>
                  <div className="w-12 h-[1px] bg-gold mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                  <span className="text-xs uppercase tracking-widest text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 flex items-center gap-2">
                    Explorar Colección <span className="text-gold">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
