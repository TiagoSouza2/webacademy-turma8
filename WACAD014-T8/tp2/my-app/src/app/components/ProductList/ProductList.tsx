import { ProductCard } from "../ProductCard/ProductCard";
import type { Product } from "../../types/product";

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
  addToFavorites: (product: Product) => void;
  isFavoriting: boolean;
}

export function ProductList({
  products,
  addToCart,
  addToFavorites,
  isFavoriting,
}: ProductListProps) {
  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            addToFavorites={addToFavorites}
            isFavoriting={isFavoriting}
          />
        ))}
      </div>
    </>
  );
}
