import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      userInfo: null,
      setToken: t => set({ token: t }),
      setUser: u => set({ user: u }),
      setUserInfo: u => set({ userInfo: u }),
      clearAuth: () => set({ token: null, userInfo: null }),
      isAuthenticated: () => !!get().token,
    }),
    { name: 'auth-store' }
  )
)
