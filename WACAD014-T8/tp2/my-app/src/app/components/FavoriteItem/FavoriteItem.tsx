import type { Product } from "../../types/product";

interface FavoriteItemProps {
  product: Product;
  removeFavorite: (id: string) => void;
  isRemoving: boolean;
}

export function FavoriteItem({
  product,
  removeFavorite,
  isRemoving,
}: FavoriteItemProps) {
  return (
    <tr>
      <td>{product.nome}</td>

      <td>
        R$ {Number(product.preco).toFixed(2)}
      </td>

      <td>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          disabled={isRemoving}
          onClick={() => removeFavorite(product.id)}
        >
          {isRemoving ? "Removendo..." : "Remover"}
        </button>
      </td>
    </tr>
  );
}
