
import { ProductCard } from "../ProductCard/ProductCard";
import type { Product } from "../../types/product";

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export function ProductList({
  products,
  addToCart,
}: ProductListProps) {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}
