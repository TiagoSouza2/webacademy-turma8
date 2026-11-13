"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  addToFavorites: (product: Product) => void;
  isFavoriting: boolean;
}

export function ProductCard({
  product,
  addToCart,
  addToFavorites,
  isFavoriting,
}: ProductCardProps) {
  const router = useRouter();

  const viewProductDetails = (productId: string): void => {
    router.push(`/product/${encodeURIComponent(productId)}`);
  };

  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
        {product.fotos[0] && (
          <button
            type="button"
            className="border-0 p-0 bg-transparent w-100"
            onClick={() => viewProductDetails(product.id)}
            aria-label={`Ver detalhes de ${product.nome}`}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={product.fotos[0].src}
              alt={product.fotos[0].titulo}
              width={300}
              height={350}
              className="card-img-top object-fit-cover"
            />
          </button>
        )}

        <div className="card-body d-flex flex-column p-3">
          <h6 className="card-title fw-semibold mb-1">
            {product.nome}
          </h6>

          <p className="fs-5 fw-bold mb-3 text-primary">
            R$ {Number(product.preco).toFixed(2)}
          </p>

          <button
            className="btn btn-primary d-block w-100 mt-auto rounded-3"
            type="button"
            onClick={() => addToCart(product)}
          >
            Adicionar no carrinho
          </button>

          <button
            className="btn btn-outline-danger d-block w-100 mt-2 rounded-3"
            type="button"
            disabled={isFavoriting}
            onClick={() => addToFavorites(product)}
          >
            {isFavoriting ? "Aguarde..." : "♡ Favoritar"}
          </button>
        </div>
      </div>
    </div>
  );
}
