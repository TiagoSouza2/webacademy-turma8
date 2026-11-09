
"use client";

import { useState } from "react";

import { mockProducts } from "./mocks/products";
import type { Product } from "./types/product";

import { ProductList } from "./components/ProductList/ProductList";
import { CartSummary } from "./components/CartSummary/CartSummary";

export default function Home() {
  const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);
  const [valorTotal, setValorTotal] = useState<number>(0);

  const addToCart = (product: Product): void => {
    setQuantidadeTotal((anterior) => anterior + 1);

    setValorTotal(
      (anterior) => anterior + Number(product.preco)
    );
  };

  return (
    <main>
      <div className="container p-5">
        <CartSummary
          quantidadeTotal={quantidadeTotal}
          valorTotal={valorTotal}
        />

        <h5 className="mb-3">Produtos disponíveis:</h5>

        <ProductList
          products={mockProducts}
          addToCart={addToCart}
        />
      </div>
    </main>
  );
}
