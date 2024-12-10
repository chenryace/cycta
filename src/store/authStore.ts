import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  password: string;
  error: string | null;
  login: (inputPassword: string) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: false,
      password: import.meta.env.VITE_AUTH_PASSWORD || '',
      error: null,
      login: (inputPassword: string) => {
        set({ isLoading: true });
        if (inputPassword === import.meta.env.VITE_AUTH_PASSWORD) {
          set({ isAuthenticated: true, error: null, isLoading: false });
        } else {
          set({ error: '密码错误', isLoading: false });
        }
      },
      signOut: () => {
        set({ isAuthenticated: false, error: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);