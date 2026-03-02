import { Product } from '../store/cartStore';

export const products: Product[] = [
  // Mujer - Diseñador
  {
    id: 1,
    name: "Chanel Coco Mademoiselle",
    price: 650000,
    image: "https://fimgs.net/mdimg/perfume/375x500.611.jpg",
    category: "mujer",
    type: "diseñador",
    description: "Una fragancia oriental floral, fresca y sensual."
  },
  {
    id: 2,
    name: "YSL Libre",
    price: 580000,
    image: "https://fimgs.net/mdimg/perfume/375x500.56976.jpg",
    category: "mujer",
    type: "diseñador",
    description: "La libertad de vivir todo al límite."
  },
  // Mujer - Arabe
  {
    id: 3,
    name: "Lattafa Yara",
    price: 180000,
    image: "https://fimgs.net/mdimg/perfume/375x500.64805.jpg",
    category: "mujer",
    type: "arabe",
    description: "Dulce, atalcado y avainillado."
  },
  // Mujer - Nicho
  {
    id: 4,
    name: "Parfums de Marly Delina",
    price: 1200000,
    image: "https://fimgs.net/mdimg/perfume/375x500.43871.jpg",
    category: "mujer",
    type: "nicho",
    description: "Un ramo floral moderno y adictivo."
  },
  // Hombre - Diseñador
  {
    id: 5,
    name: "Dior Sauvage",
    price: 620000,
    image: "https://fimgs.net/mdimg/perfume/375x500.31009.jpg",
    category: "hombre",
    type: "diseñador",
    description: "Radicalmente fresco, noble y crudo."
  },
  {
    id: 6,
    name: "Versace Eros",
    price: 450000,
    image: "https://fimgs.net/mdimg/perfume/375x500.16677.jpg",
    category: "hombre",
    type: "diseñador",
    description: "Amor, pasión, belleza y deseo."
  },
  // Hombre - Arabe
  {
    id: 7,
    name: "Afnan 9PM",
    price: 160000,
    image: "https://fimgs.net/mdimg/perfume/375x500.65414.jpg",
    category: "hombre",
    type: "arabe",
    description: "Una bomba de vainilla y ámbar para la noche."
  },
  // Hombre - Nicho
  {
    id: 8,
    name: "Creed Aventus",
    price: 1500000,
    image: "https://fimgs.net/mdimg/perfume/375x500.9828.jpg",
    category: "hombre",
    type: "nicho",
    description: "El rey de los perfumes masculinos."
  },
  // Unisex/Fragancias
  {
    id: 9,
    name: "Maison Francis Kurkdjian Baccarat Rouge 540",
    price: 1800000,
    image: "https://fimgs.net/mdimg/perfume/375x500.33519.jpg",
    category: "unisex",
    type: "nicho",
    description: "Luminoso, denso, transparente e intenso."
  }
];
