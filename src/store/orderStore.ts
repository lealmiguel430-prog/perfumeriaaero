import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  paymentMethod: string;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  getOrdersByUser: (userId: string) => Order[];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
      })),
      getOrdersByUser: (userId) => get().orders.filter((o) => o.userId === userId),
    }),
    {
      name: 'order-storage',
    }
  )
);
