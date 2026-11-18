
'use client'

import { useContext } from 'react'
import Image from 'next/image'
import { calculateDiscountedPrice } from '@/app/helpers'
import type { Product } from '@/app/types/product'
import { FavoritesContext } from '@/app/context/Favorites/FavoritesProvider'

interface FavoriteItemProps {
  favoriteItem: Product
}

export default function FavoriteItem({
  favoriteItem
}: FavoriteItemProps) {
  const { setFavorites } = useContext(FavoritesContext)

  const removeFavorite = (id: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((item) => item.id !== id)
    )
  }

  return (
    <tr>
      <td className="d-flex flex-row">
        <Image
          className="rounded"
          src={favoriteItem.fotos[0].src}
          alt={favoriteItem.fotos[0].titulo}
          width={50}
          height={50}
        />

        <div className="d-flex flex-column ms-2">
          <span>{favoriteItem.nome}</span>

          <small className="text-muted">
            {favoriteItem.descricao}
          </small>
        </div>
      </td>

      <td>
        R${' '}
        {calculateDiscountedPrice(
          Number(favoriteItem.preco),
          favoriteItem.desconto
        ).toFixed(2)}
      </td>

      <td>{favoriteItem.desconto}%</td>

      <td>
        <button
          type="button"
          onClick={() => removeFavorite(favoriteItem.id)}
          className="btn btn-outline-danger btn-sm"
        >
          Remover
        </button>
      </td>
    </tr>
  )
}
