import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductStore } from '@/store/productStore';
import ProductCard from '@/components/common/ProductCard';
import SidebarFilters, { FilterState } from '@/components/shop/SidebarFilters';
import { Filter, X, ChevronDown } from 'lucide-react';

interface ShopProps {
  category: 'mujer' | 'hombre';
}

const Shop = ({ category }: ShopProps) => {
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get('type');
  const { products } = useProductStore();
  
  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000000],
    sizes: [],
    categories: []
  });

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Initialize filters from URL
  useEffect(() => {
    if (typeFilter) {
      // If type is a known category, set it
      // This logic would be more complex in a real app
    }
  }, [typeFilter]);

  // Apply filters
  useEffect(() => {
    let result = products.filter(p => p.category === category || p.category === 'unisex');
    
    // Filter by Type (from URL)
    if (typeFilter) {
      result = result.filter(p => p.type === typeFilter);
    }

    // Filter by Size
    if (filters.sizes.length > 0) {
      // Mock logic as product data might not have sizes explicitly
      // result = result.filter(p => filters.sizes.includes(p.size));
    }

    // Filter by Category (Families)
    if (filters.categories.length > 0) {
       // Mock logic
       // result = result.filter(p => filters.categories.includes(p.family));
    }
    
    setFilteredProducts(result);
  }, [category, typeFilter, filters]);

  const categoryTitle = category === 'mujer' ? 'Perfumes para Mujer' : 'Perfumes para Hombre';

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileFilterOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0B]">
      {/* Hero Title Strip */}
      <div className="bg-[#121212] py-12 md:py-20 border-b border-gold/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container-custom text-center relative z-10">
           <h1 className="text-4xl md:text-6xl font-serif text-white mb-3 tracking-tight">{categoryTitle}</h1>
           <p className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase font-bold">Catálogo Exclusivo 2026</p>
        </div>
      </div>
      
      <div className="flex-grow py-12">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <SidebarFilters 
                  filters={filters} 
                  onFilterChange={setFilters}
                />
              </div>
            </aside>

            {/* Mobile Filter Drawer Overlay */}
            <div className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${isMobileFilterOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
              <div className={`absolute inset-y-0 right-0 w-[85%] max-w-sm bg-[#1A2220] p-6 shadow-2xl transform transition-transform duration-300 border-l border-gold/20 overflow-y-auto ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                  <h2 className="text-xl font-serif text-gold">Filtros</h2>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-400 hover:text-white p-2">
                    <X size={24} />
                  </button>
                </div>
                <SidebarFilters 
                  filters={filters} 
                  onFilterChange={setFilters}
                />
                <div className="mt-8 pt-6 border-t border-white/10 sticky bottom-0 bg-[#1A2220] pb-4">
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full btn-primary"
                  >
                    Ver {filteredProducts.length} Resultados
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {/* Top Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-white/5 text-xs text-gray-400 gap-4">
                
                {/* Mobile Filter Trigger */}
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden w-full sm:w-auto flex items-center justify-center gap-2 text-gold border border-gold/30 px-6 py-3 rounded-sm hover:bg-gold/10 transition-colors uppercase tracking-widest font-bold"
                >
                  <Filter size={16} />
                  <span>Filtrar Productos</span>
                </button>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                  <span className="hidden sm:inline">Mostrando <span className="text-white font-bold">{filteredProducts.length}</span> resultados</span>
                  
                  <div className="flex items-center gap-2 ml-auto sm:ml-0 relative group">
                    <span>Ordenar por:</span>
                    <button className="flex items-center gap-1 text-white font-bold hover:text-gold transition-colors">
                      {sortBy === 'newest' ? 'Más Recientes' : 'Precio'} <ChevronDown size={14} />
                    </button>
                    {/* Dropdown for sort would go here */}
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="h-full animate-fade-in-up">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-[#1A2220]/30 border border-white/5 rounded-sm">
                  <Filter size={48} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-lg text-gray-300 font-serif mb-2">No se encontraron productos</p>
                  <p className="text-sm text-gray-500 mb-6">Intenta ajustar tus filtros de búsqueda.</p>
                  <button 
                    onClick={() => setFilters({ priceRange: [0, 5000000], sizes: [], categories: [] })}
                    className="px-8 py-3 bg-transparent border border-gold text-gold font-bold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-colors inline-block"
                  >
                    Limpiar Filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
