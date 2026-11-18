'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { calculateDiscountedPrice } from '@/app/helpers'
import type { Product } from '@/app/types/product'

interface FavoritesContextType {
  favorites: Product[]
  isFavorite: (id: string) => boolean
  add: (product: Product) => void
  remove: (id: string) => void
  total: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function useFavoritesContext() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavoritesContext must be used within FavoritesProvider')
  return context
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])

  const isFavorite = (id: string) => favorites.some(product => product.id === id)
  const add = (product: Product) => setFavorites(current =>
    current.some(item => item.id === product.id) ? current : [...current, product]
  )
  const remove = (id: string) => setFavorites(current =>
    current.filter(product => product.id !== id)
  )
  const total = favorites.reduce((sum, product) =>
    sum + calculateDiscountedPrice(Number(product.preco), product.desconto), 0
  )

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, add, remove, total }}>
      {children}
    </FavoritesContext.Provider>
  )
}
