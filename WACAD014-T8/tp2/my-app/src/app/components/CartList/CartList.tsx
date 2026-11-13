
import { CartItem } from "../CartItem/CartItem";
import type { CartItemsType } from "../../types/cart";

interface CartListProps {
  cartItems: CartItemsType[];
  removeItemFromCart: (id: string) => void;
}

export function CartList({
  cartItems,
  removeItemFromCart,
}: CartListProps) {
  return (
    <div className="card mb-4 border-0 shadow-sm rounded-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-semibold">
          Produtos selecionados
        </h5>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opções</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  removeItemFromCart={removeItemFromCart}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
