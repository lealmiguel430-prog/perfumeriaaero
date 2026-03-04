import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

interface CategoryState {
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

const initialCategories: Category[] = [
  { id: '1', name: 'Mujer', slug: 'mujer', description: 'Fragancias femeninas' },
  { id: '2', name: 'Hombre', slug: 'hombre', description: 'Fragancias masculinas' },
  { id: '3', name: 'Unisex', slug: 'unisex', description: 'Fragancias para todos' },
];

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: initialCategories,
      addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
      updateCategory: (id, updates) => set((state) => ({
        categories: state.categories.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      })),
      deleteCategory: (id) => set((state) => ({
        categories: state.categories.filter((c) => c.id !== id),
      })),
    }),
    {
      name: 'category-storage',
    }
  )
);
