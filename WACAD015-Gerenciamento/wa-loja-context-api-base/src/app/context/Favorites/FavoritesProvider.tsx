'use client'

import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react'

import type { Product } from '@/app/types/product'

interface FavoritesContextType {
  favorites: Product[]
  setFavorites: Dispatch<SetStateAction<Product[]>>
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => {}
})

interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({
  children
}: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Product[]>([])

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}
