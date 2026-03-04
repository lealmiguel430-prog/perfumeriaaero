import { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, Save, Image as ImageIcon, Download, Upload } from 'lucide-react';
import { useProductStore, Product } from '../../store/productStore';
import { useCategoryStore } from '../../store/categoryStore';
import * as XLSX from 'xlsx';

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const { categories } = useCategoryStore();
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
    discount: 0,
    scentFamily: 'Floral',
    collection: 'catalog',
    size: '100ml'
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
        image: './images/products/product-1.jpg',
        stock: 10,
        status: 'active',
        discount: 0,
        scentFamily: 'Floral',
        collection: 'catalog',
        size: '100ml'
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      deleteProduct(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentProduct) {
      // Edit
      updateProduct(currentProduct.id, formData);
    } else {
      // Create
      const newProduct = {
        ...formData,
        id: Date.now().toString(),
      } as Product;
      addProduct(newProduct);
    }
    setIsModalOpen(false);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(products);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Productos");
    XLSX.writeFile(wb, "productos_aero.xlsx");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json<any>(ws);

        if (data.length === 0) {
          alert('El archivo está vacío o no tiene datos válidos.');
          return;
        }

        let importedCount = 0;
        data.forEach((row) => {
          // Basic validation to ensure at least name exists
          if (row.name) {
            const newProduct: Product = {
              id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
              name: row.name,
              price: Number(row.price) || 0,
              category: row.category || 'Mujer',
              image: row.image || './images/products/product-1.jpg',
              description: row.description || '',
              stock: Number(row.stock) || 0,
              status: row.status === 'draft' ? 'draft' : 'active',
              discount: Number(row.discount) || 0,
              scentFamily: row.scentFamily || 'Floral',
              collection: row.collection === 'new' ? 'new' : 'catalog',
              type: row.type || 'diseñador',
              size: row.size || '100ml'
            };
            addProduct(newProduct);
            importedCount++;
          }
        });
        alert(`Se han importado ${importedCount} productos correctamente.`);
      } catch (error) {
        console.error("Error al importar:", error);
        alert('Hubo un error al leer el archivo Excel.');
      }
    };
    reader.readAsBinaryString(file);
    // Reset input
    e.target.value = '';
  };

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestión de Productos</h1>
          <p className="text-gray-400 text-sm mt-1">Administra tu inventario, precios y stock</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Export Button */}
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition-colors"
            title="Descargar lista de productos en Excel"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Exportar Excel</span>
          </button>

          {/* Import Button */}
          <div className="relative">
            <input 
              type="file" 
              accept=".xlsx, .xls" 
              onChange={handleImport}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Subir archivo Excel con productos"
            />
            <button 
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors w-full"
            >
              <Upload size={18} />
              <span className="hidden sm:inline">Importar Excel</span>
            </button>
          </div>

          <button 
            onClick={() => handleOpenModal()}
            className="btn-primary flex items-center justify-center gap-2 px-4 py-3"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Nuevo Producto</span>
          </button>
        </div>
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
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <select className="flex-1 bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none">
            <option value="">Estado</option>
            <option value="active">Activo</option>
            <option value="draft">Borrador</option>
          </select>
        </div>
      </div>

      {/* Products Grid/Table */}
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
                    {product.discount > 0 && (
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
                    {product.discount > 0 ? (
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
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
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
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Familia Olfativa</label>
                  <select 
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                    value={formData.scentFamily}
                    onChange={(e) => setFormData({...formData, scentFamily: e.target.value})}
                  >
                    <option value="Amaderado">Amaderado</option>
                    <option value="Cítrico">Cítrico</option>
                    <option value="Floral">Floral</option>
                    <option value="Oriental">Oriental</option>
                    <option value="Frutal">Frutal</option>
                    <option value="Fresco">Fresco</option>
                    <option value="Gourmand">Gourmand</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Colección / Ubicación</label>
                  <select 
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                    value={formData.collection}
                    onChange={(e) => setFormData({...formData, collection: e.target.value as 'catalog' | 'new'})}
                  >
                    <option value="catalog">Catálogo General</option>
                    <option value="new">Nuevos Lanzamientos</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Tamaño</label>
                  <select 
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                  >
                    <option value="50ml">50ml</option>
                    <option value="100ml">100ml</option>
                    <option value="200ml">200ml</option>
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
                    {[10, 20, 30, 40, 50, 60, 70].map(d => (
                      <option key={d} value={d}>{d}% OFF</option>
                    ))}
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
