import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useCategoryStore, Category } from '../../store/categoryStore';

const AdminCategories = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategoryStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    slug: '',
    description: ''
  });

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setCurrentCategory(category);
      setFormData(category);
    } else {
      setCurrentCategory(null);
      setFormData({ name: '', slug: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      deleteCategory(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCategory) {
      updateCategory(currentCategory.id, formData);
    } else {
      addCategory({
        ...formData,
        id: Date.now().toString(),
        slug: formData.name?.toLowerCase().replace(/\s+/g, '-') || ''
      } as Category);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Gestión de Categorías</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2 px-4 py-2"
        >
          <Plus size={18} />
          Nueva Categoría
        </button>
      </div>

      <div className="bg-[#121212] border border-white/5 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-gray-400 uppercase tracking-wider font-medium">
            <tr>
              <th className="px-6 py-4">Nombre</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Descripción</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-white font-medium">{category.name}</td>
                <td className="px-6 py-4 text-gray-400">{category.slug}</td>
                <td className="px-6 py-4 text-gray-400">{category.description}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleOpenModal(category)}
                      className="p-2 text-gray-400 hover:text-gold hover:bg-gold/10 rounded"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded"
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

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121212] border border-white/10 rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                {currentCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Descripción</label>
                <textarea 
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 rounded focus:border-gold/50 focus:outline-none resize-none"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="w-full btn-primary py-2 flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
