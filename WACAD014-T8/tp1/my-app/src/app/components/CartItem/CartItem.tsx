
import type { CartItemsType } from "../../types/cart";

interface CartItemProps {
  cartItem: CartItemsType;
  removeItemFromCart: (id: string) => void;
}

export function CartItem({
  cartItem,
  removeItemFromCart,
}: CartItemProps) {
  const getProductTotal = (
    price: number,
    quantity: number
  ): number => price * quantity;

  return (
    <tr>
      <td>{cartItem.nome}</td>

      <td>R$ {cartItem.preco.toFixed(2)}</td>

      <td>{cartItem.quantidade}</td>

      <td>
        R$ {getProductTotal(
          cartItem.preco,
          cartItem.quantidade
        ).toFixed(2)}
      </td>

      <td>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={() => removeItemFromCart(cartItem.id)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
