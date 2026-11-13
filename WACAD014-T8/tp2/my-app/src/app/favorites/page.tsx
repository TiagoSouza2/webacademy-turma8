"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { favoriteApi } from "../services/api";
import { FavoritesList } from "../components/FavoritesList/FavoritesList";
import type { Product } from "../types/product";

export default function Favorites() {
  const queryClient = useQueryClient();

  // Buscar produtos favoritos
  const {
    data: favorites,
    isPending,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["favorites"],
    queryFn: async (): Promise<Product[]> => {
      const response = await favoriteApi.get<Product[]>("/favoritos");
      return response.data;
    },
  });

  // Remover produto dos favoritos
  const removeFavoriteMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await favoriteApi.delete(
        `/favoritos/${encodeURIComponent(id)}`
      );
    },

    onSuccess: async () => {
      toast.success("Produto removido dos favoritos!");

      await queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },

    onError: () => {
      toast.error("Erro ao remover o produto dos favoritos.");
    },
  });

  const removeFavorite = (id: string): void => {
    removeFavoriteMutation.mutate(id);
  };

  return (
    <main>
      <div className="container p-5">
        {isPending && <p>Carregando favoritos...</p>}

        {isError && (
          <div className="alert alert-danger" role="alert">
            Erro ao carregar os favoritos.
          </div>
        )}

        {favorites && (
          <FavoritesList
            products={favorites}
            removeFavorite={removeFavorite}
            removingId={
              removeFavoriteMutation.isPending
                ? removeFavoriteMutation.variables
                : undefined
            }
          />
        )}
      </div>
    </main>
  );
}
