import { FavoriteItem } from "../FavoriteItem/FavoriteItem";
import type { Product } from "../../types/product";

interface FavoritesListProps {
  products: Product[];
  removeFavorite: (id: string) => void;
  removingId?: string;
}

export function FavoritesList({
  products,
  removeFavorite,
  removingId,
}: FavoritesListProps) {
  return (
    <div className="card mb-4 border-0 shadow-sm rounded-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-semibold">
          Produtos Favoritos
        </h5>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor</th>
                <th>Opções</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <FavoriteItem
                  key={product.id}
                  product={product}
                  removeFavorite={removeFavorite}
                  isRemoving={removingId === product.id}
                />
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <p className="text-muted text-center">
            Nenhum produto favorito encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
