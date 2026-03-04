import { create } from 'zustand';

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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  maintenanceMode: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  setMaintenanceMode: (enabled) => set({ maintenanceMode: enabled }),
}));
