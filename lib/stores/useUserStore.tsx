// lib/stores/useUserStore.ts
import { create } from 'zustand';

interface User {
  id: number | null;
  name: string | null;
  email: string | null;
}

interface UserStore {
  user: User;
  setUser: (user: Partial<User>) => void;
  clearUser: () => void;
  updateUserName: (name: string) => void;
  updateUserEmail: (email: string) => void;
}

const initialUserState: User = {
  id: null,
  name: null,
  email: null,
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: initialUserState,
  
  setUser: (userData: Partial<User>) =>
    set((state) => ({
      user: { ...state.user, ...userData },
    })),
  
  clearUser: () =>
    set({
      user: initialUserState,
    }),
  
  updateUserName: (name: string) =>
    set((state) => ({
      user: { ...state.user, name },
    })),
  
  updateUserEmail: (email: string) =>
    set((state) => ({
      user: { ...state.user, email },
    })),
}));