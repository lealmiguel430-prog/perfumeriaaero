import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role?: 'admin' | 'user' | 'superadmin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  maintenanceMode: boolean;
  login: (user: User) => void;
  logout: () => void;
  setMaintenanceMode: (enabled: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      maintenanceMode: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setMaintenanceMode: (enabled) => set({ maintenanceMode: enabled }),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
    }
  )
);
