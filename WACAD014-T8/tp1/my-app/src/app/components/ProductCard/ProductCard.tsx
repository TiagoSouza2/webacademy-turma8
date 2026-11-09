
"use client";

import Image from "next/image";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export function ProductCard({
  product,
  addToCart,
}: ProductCardProps) {
  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
        {product.fotos[0] && (
          <Image
            src={product.fotos[0].src}
            alt={product.fotos[0].titulo}
            width={300}
            height={350}
            className="card-img-top object-fit-cover"
          />
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
        </div>
      </div>
    </div>
  );
}
