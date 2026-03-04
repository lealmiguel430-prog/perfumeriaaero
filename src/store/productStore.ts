import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  status: 'active' | 'draft';
  discount: number;
  type?: string;
  scentFamily?: string;
  collection?: 'catalog' | 'new';
}

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

// Initial Data
const initialProducts: Product[] = [
  {
    id: '1',
    name: "Chanel Coco Mademoiselle",
    price: 650000,
    image: "./images/products/product-1.jpg",
    category: "mujer",
    type: "diseñador",
    scentFamily: "Floral",
    collection: "catalog",
    description: "Una fragancia oriental floral, fresca y sensual.",
    stock: 21,
    status: 'active',
    discount: 0
  },
  {
    id: '2',
    name: "YSL Libre",
    price: 580000,
    image: "./images/products/product-2.jpg",
    category: "mujer",
    type: "diseñador",
    scentFamily: "Floral",
    collection: "new",
    description: "La libertad de vivir todo al límite.",
    stock: 10,
    status: 'active',
    discount: 0
  },
  {
    id: '3',
    name: "Lattafa Yara",
    price: 180000,
    image: "./images/products/product-3.jpg",
    category: "mujer",
    type: "arabe",
    scentFamily: "Oriental",
    collection: "catalog",
    description: "Dulce, atalcado y avainillado.",
    stock: 27,
    status: 'active',
    discount: 0
  },
  {
    id: '4',
    name: "Parfums de Marly Delina",
    price: 1200000,
    image: "./images/products/product-4.jpg",
    category: "mujer",
    type: "nicho",
    description: "Un ramo floral moderno y adictivo.",
    stock: 33,
    status: 'active',
    discount: 0
  },
  {
    id: '5',
    name: "Dior Sauvage",
    price: 620000,
    image: "./images/products/product-5.jpg",
    category: "hombre",
    type: "diseñador",
    description: "Radicalmente fresco, noble y crudo.",
    stock: 22,
    status: 'active',
    discount: 0
  },
  {
    id: '6',
    name: "Versace Eros",
    price: 450000,
    image: "./images/products/product-6.jpg",
    category: "hombre",
    type: "diseñador",
    description: "Amor, pasión, belleza y deseo.",
    stock: 45,
    status: 'active',
    discount: 0
  },
  {
    id: '7',
    name: "Afnan 9PM",
    price: 160000,
    image: "./images/products/product-7.jpg",
    category: "hombre",
    type: "arabe",
    description: "Una bomba de vainilla y ámbar para la noche.",
    stock: 50,
    status: 'active',
    discount: 0
  },
  {
    id: '8',
    name: "Creed Aventus",
    price: 1500000,
    image: "./images/products/product-8.jpg",
    category: "hombre",
    type: "nicho",
    description: "El rey de los perfumes masculinos.",
    stock: 45,
    status: 'active',
    discount: 0
  },
  {
    id: '9',
    name: "Maison Francis Kurkdjian Baccarat Rouge 540",
    price: 1800000,
    image: "./images/products/product-9.jpg",
    category: "unisex",
    type: "nicho",
    description: "Luminoso, denso, transparente e intenso.",
    stock: 7,
    status: 'active',
    discount: 0
  }
];

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      })),
      getProduct: (id) => get().products.find((p) => p.id === id),
    }),
    {
      name: 'product-storage',
    }
  )
);
