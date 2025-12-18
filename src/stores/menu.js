import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useMenuStore = create(
  persist(
    (set, get) => ({
      menuList: [],
      setMenuList: list => set({ menuList: list }),
    }),
    { name: 'menu-store' }
  )
)
