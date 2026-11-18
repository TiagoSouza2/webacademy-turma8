
'use client'

import Image from 'next/image'

import { calculateDiscountedPrice } from '@/app/helpers'
import type { Product } from '@/app/types/product'
import { useFavoritesContext } from '@/app/context/Favorites/FavoritesProvider'

interface ProductCardProps {
  product: Product
  showImage?: boolean
  showButton?: boolean
}

export default function ProductCard({
  product,
  showImage = true,
  showButton = true
}: ProductCardProps) {
  const { isFavorite, add } = useFavoritesContext()
  const favorited = isFavorite(product.id)

  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm rounded-4">
        {showImage && (
          <Image
            src={product.fotos[0].src}
            className="card-img-top rounded-top-4 object-fit-cover w-100"
            alt={product.fotos[0].titulo}
            width={300}
            height={260}
          />
        )}

        <div className="card-body d-flex flex-column">
          <span className="badge text-success-emphasis bg-success-subtle border border-success-subtle align-self-start mb-2">
            {product.desconto}% de desconto
          </span>

          <h6 className="card-title fw-semibold mb-1">
            {product.nome}
          </h6>

          <span className="text-body-secondary small text-decoration-line-through">
            R$ {product.preco}
          </span>

          <p className="fs-5 fw-bold mb-3">
            R${' '}
            {calculateDiscountedPrice(
              Number(product.preco),
              product.desconto
            )}
          </p>

          {showButton && (
            <button
              className={
                favorited
                  ? 'btn btn-success d-block w-100 mt-auto rounded-3'
                  : 'btn btn-primary d-block w-100 mt-auto rounded-3'
              }
              type="button"
              onClick={() => add(product)}
              disabled={favorited}
            >
              {favorited ? 'Favoritado' : 'Favoritar'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
