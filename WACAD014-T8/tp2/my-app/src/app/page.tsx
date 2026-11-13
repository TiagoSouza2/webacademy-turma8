"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { productsApi, favoriteApi } from "./services/api";
import type { Product } from "./types/product";

import { ProductList } from "./components/ProductList/ProductList";
import { CartSummary } from "./components/CartSummary/CartSummary";

import { toast } from "react-toastify";

export default function Home() {
  const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);
  const [valorTotal, setValorTotal] = useState<number>(0);

  const [feedback, setFeedback] = useState<{
    mensagem: string;
    tipo: "success" | "danger";
  } | null>(null);

  const {
    data: products,
    isPending,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const response = await productsApi.get<Product[]>("/produto");
      return response.data;
    },
  });

  const addToCart = (product: Product): void => {
    setQuantidadeTotal((anterior) => anterior + 1);
    setValorTotal(
      (anterior) => anterior + Number(product.preco)
    );
  };

  const favoriteMutation = useMutation({
    mutationFn: async (product: Product): Promise<Product> => {
      const response = await favoriteApi.post<Product>(
        "/favoritos",
        product
      );

      return response.data;
    },
    onSuccess: (_data, product) => {
      toast.success(
        `${product.nome} adicionado aos favoritos!`
      );
    },

    onError: () => {
      toast.error(
        "Erro ao adicionar o produto aos favoritos."
      );
    },

  });

  const addToFavorites = (product: Product): void => {
    setFeedback(null);
    favoriteMutation.mutate(product);
  };

  return (
    <main>
      <div className="container p-5">
        <CartSummary
          quantidadeTotal={quantidadeTotal}
          valorTotal={valorTotal}
        />

        {feedback && (
          <div
            className={`alert alert-${feedback.tipo}`}
            role="alert"
          >
            {feedback.mensagem}
          </div>
        )}

        {isPending && <p>Carregando produtos...</p>}

        {isError && (
          <p className="text-danger">
            Erro ao carregar os produtos.
          </p>
        )}

        {products && (
          <ProductList
            products={products}
            addToCart={addToCart}
            addToFavorites={addToFavorites}
            isFavoriting={favoriteMutation.isPending}
          />
        )}
      </div>
    </main>
  );
}
