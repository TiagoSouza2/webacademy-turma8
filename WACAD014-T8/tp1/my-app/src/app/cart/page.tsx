
import { CartList } from "../components/CartList/CartList";
import { CartSummary } from "../components/CartSummary/CartSummary";

export default function Cart() {
  return (
    <main>
      <div className="container p-5">
        <CartList />

        <CartSummary
          quantidade={4}
          total={1350}
        />
      </div>
    </main>
  );
}
