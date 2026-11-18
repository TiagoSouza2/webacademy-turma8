'use client'
import { useContext } from 'react'
import FavoritesList from '../components/FavoritesList/FavoritesList'
import { FavoritesContext } from '../context/Favorites/FavoritesProvider'

export default function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext)

  return (
    <main>
      <div className="container p-5">
        <FavoritesList />
      </div>
    </main>
  )
}
