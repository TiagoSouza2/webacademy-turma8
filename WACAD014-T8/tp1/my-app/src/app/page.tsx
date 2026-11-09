
import { CartSummary } from "./components/CartSummary/CartSummary";
import { ProductList } from "./components/ProductList/ProductList";

export default function Products() {
  return (
    <main>
      <div className="container p-5">
        <CartSummary
          quantidade={4}
          total={1350}
        />

        <ProductList />
      </div>
    </main>
  );
}
