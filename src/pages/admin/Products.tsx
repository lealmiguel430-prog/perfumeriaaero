import { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { products as initialProducts } from '../../data/products';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock?: number;
  status?: 'active' | 'draft';
  discount?: number;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts.map(p => ({
    ...p,
    id: p.id.toString(),
    description: p.description || '',
    category: p.category as string,
    stock: Math.floor(Math.random() * 50) + 5,
    status: 'active' as const,
    discount: 0
  })));
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'Mujer',
    price: 0,
    description: '',
    image: '',
    stock: 0,
    status: 'active',
    discount: 0
  });

  // Filter products based on search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setCurrentProduct(product);
      setFormData(product);
    } else {
      setCurrentProduct(null);
      setFormData({
        name: '',
        category: 'Mujer',
        price: 0,
        description: '',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
        stock: 10,
        status: 'active',
        discount: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentProduct) {
      // Edit
      setProducts(products.map(p => 
        p.id === currentProduct.id ? { ...formData, id: currentProduct.id } as Product : p
      ));
    } else {
      // Create
      const newProduct = {
        ...formData,
        id: Date.now().toString(),
      } as Product;
      setProducts([newProduct, ...products]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestión de Productos</h1>
          <p className="text-gray-400 text-sm mt-1">Administra tu inventario, precios y stock</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center justify-center gap-2 px-4 py-3 w-full md:w-auto"
        >
          <Plus size={18} />
          Nuevo Producto
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-[#121212] border border-white/5 p-4 rounded-lg mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o categoría..." 
            className="w-full bg-black/50 border border-white/10 text-white pl-10 pr-4 py-2 rounded focus:border-gold/50 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="flex-1 bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none">
            <option value="">Categoría</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Unisex">Unisex</option>
          </select>
          <select className="flex-1 bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none">
            <option value="">Estado</option>
            <option value="active">Activo</option>
            <option value="draft">Borrador</option>
          </select>
        </div>
      </div>

      {/* Products Grid (Mobile) & Table (Desktop) */}
      <div className="bg-[#121212] border border-white/5 rounded-lg overflow-hidden">
        
        {/* Mobile View: Cards */}
        <div className="md:hidden divide-y divide-white/5">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-4 flex gap-4">
              <div className="w-20 h-20 flex-shrink-0 rounded bg-gray-800 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-medium truncate">{product.name}</h3>
                    <p className="text-gray-400 text-xs">{product.category}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                    product.status === 'active' 
                      ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                      : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                  }`}>
                    {product.status === 'active' ? 'Activo' : 'Borrador'}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-gold font-bold">${product.price.toLocaleString('es-CO')}</span>
                    {product.discount && product.discount > 0 && (
                      <span className="ml-2 text-[10px] text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenModal(product)}
                      className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-full"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded-full"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400 uppercase tracking-wider font-medium">
              <tr>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Oferta</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-gray-800 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[150px]">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{product.category}</td>
                  <td className="px-6 py-4 text-white font-medium">
                    ${product.price.toLocaleString('es-CO')}
                  </td>
                  <td className="px-6 py-4">
                    {product.discount && product.discount > 0 ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                        -{product.discount}%
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      product.status === 'active' 
                        ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                        : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                    }`}>
                      {product.status === 'active' ? 'Activo' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(product)}
                        className="p-2 text-gray-400 hover:text-gold hover:bg-gold/10 rounded transition-colors" 
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors" 
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No se encontraron productos que coincidan con la búsqueda.
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121212] border border-white/10 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#121212] z-10">
              <h2 className="text-xl font-bold text-white">
                {currentProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Preview */}
                <div className="col-span-1 md:col-span-2 flex justify-center">
                  <div className="relative w-32 h-32 rounded-lg bg-gray-800 overflow-hidden border-2 border-dashed border-gray-600 hover:border-gold transition-colors group">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <ImageIcon size={24} />
                        <span className="text-xs mt-2">Subir Imagen</span>
                      </div>
                    )}
                    <input 
                      type="text" 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      placeholder="URL de imagen"
                      onChange={(e) => setFormData({...formData, image: e.target.value})} // Simplification for demo
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Nombre del Producto</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Categoría</label>
                  <select 
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Mujer">Mujer</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Precio ($)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Stock</label>
                  <input 
                    type="number" 
                    required
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Oferta (%)</label>
                  <select 
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                    value={formData.discount}
                    onChange={(e) => setFormData({...formData, discount: Number(e.target.value)})}
                  >
                    <option value="0">Sin oferta</option>
                    <option value="10">10% OFF</option>
                    <option value="20">20% OFF</option>
                    <option value="30">30% OFF</option>
                    <option value="40">40% OFF</option>
                    <option value="50">50% OFF</option>
                    <option value="60">60% OFF</option>
                    <option value="70">70% OFF</option>
                  </select>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-400">Descripción</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                
                 <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-400">URL de Imagen</label>
                  <input 
                    type="text" 
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/5">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-white/10 rounded text-gray-400 hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gold text-black font-bold rounded hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;