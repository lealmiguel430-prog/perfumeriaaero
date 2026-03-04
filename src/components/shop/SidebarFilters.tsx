import { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

export interface FilterState {
  priceRange: [number, number];
  sizes: string[];
  categories: string[];
}

interface SidebarFiltersProps {
  className?: string;
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  counts?: {
    sizes: Record<string, number>;
    categories: Record<string, number>;
  };
}

const SidebarFilters = ({ 
  className = "", 
  filters, 
  onFilterChange,
  counts = { sizes: {}, categories: {} }
}: SidebarFiltersProps) => {
  
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    size: true,
    category: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Mock data definition
  const availableSizes = ['75ml', '100ml', '125ml', '200ml'];
  const availableCategories = ['Accesorios de Lujo', 'Almendrado', 'Almizclado', 'Amaderado', 'Ámbar', 'Cítrico', 'Floral'];

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  return (
    <div className={`space-y-8 ${className}`}>
      
      {/* Price Filter */}
      <div className="border-b border-white/10 pb-6">
        <button 
          onClick={() => toggleSection('price')}
          className="flex justify-between items-center w-full text-left mb-4 group"
        >
          <h3 className="text-sm font-bold text-cream uppercase tracking-widest group-hover:text-gold transition-colors">Precio</h3>
          {expandedSections.price ? <ChevronUp size={16} className="text-gold" /> : <ChevronDown size={16} className="text-gray-500" />}
        </button>
        
        {expandedSections.price && (
          <div className="px-1 animate-fade-in">
            <div className="h-1 bg-white/10 rounded-full mb-6 relative mt-4">
              <div className="absolute left-0 right-0 h-full bg-gold/50 rounded-full"></div>
              {/* Range sliders would go here - simplified for UI */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gold rounded-full shadow-lg cursor-pointer hover:scale-125 transition-transform"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gold rounded-full shadow-lg cursor-pointer hover:scale-125 transition-transform"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 font-medium font-mono">
              <span>$ 150.000</span>
              <span>$ 5.200.000</span>
            </div>
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="border-b border-white/10 pb-6">
        <button 
          onClick={() => toggleSection('size')}
          className="flex justify-between items-center w-full text-left mb-4 group"
        >
          <h3 className="text-sm font-bold text-cream uppercase tracking-widest group-hover:text-gold transition-colors">Tamaño</h3>
          {expandedSections.size ? <ChevronUp size={16} className="text-gold" /> : <ChevronDown size={16} className="text-gray-500" />}
        </button>
        
        {expandedSections.size && (
          <ul className="space-y-3 animate-fade-in">
            {availableSizes.map((size) => {
              const isSelected = filters.sizes.includes(size);
              return (
                <li key={size} className="flex items-center justify-between group cursor-pointer" onClick={() => handleSizeToggle(size)}>
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 border ${isSelected ? 'border-gold bg-gold' : 'border-white/20'} rounded-sm flex items-center justify-center transition-all`}>
                      {isSelected && <Check size={10} className="text-black" />}
                    </div>
                    <span className={`text-xs ${isSelected ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gold'} transition-colors`}>{size}</span>
                  </div>
                  <span className="text-white/20 text-[10px]">({counts.sizes[size] || 0})</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Categories Filter */}
      <div>
        <button 
          onClick={() => toggleSection('category')}
          className="flex justify-between items-center w-full text-left mb-4 group"
        >
          <h3 className="text-sm font-bold text-cream uppercase tracking-widest group-hover:text-gold transition-colors">Familia Olfativa</h3>
          {expandedSections.category ? <ChevronUp size={16} className="text-gold" /> : <ChevronDown size={16} className="text-gray-500" />}
        </button>
        
        {expandedSections.category && (
          <ul className="space-y-3 animate-fade-in max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {availableCategories.map((cat) => {
              const isSelected = filters.categories.includes(cat);
              return (
                <li key={cat} className="flex items-center justify-between group cursor-pointer" onClick={() => handleCategoryToggle(cat)}>
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 border ${isSelected ? 'border-gold bg-gold' : 'border-white/20'} rounded-sm flex items-center justify-center transition-all`}>
                      {isSelected && <Check size={10} className="text-black" />}
                    </div>
                    <span className={`text-xs ${isSelected ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gold'} transition-colors`}>{cat}</span>
                  </div>
                  <span className="text-white/20 text-[10px] bg-white/5 px-2 py-0.5 rounded-full">
                    {counts.categories[cat] || Math.floor(Math.random() * 20) + 1}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SidebarFilters;
