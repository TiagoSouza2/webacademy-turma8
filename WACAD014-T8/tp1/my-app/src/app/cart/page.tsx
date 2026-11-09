
"use client";

import { useState } from "react";

import { CartList } from "../components/CartList/CartList";
import { CartSummary } from "../components/CartSummary/CartSummary";

import { mockCartItems } from "../mocks/cartItems";
import type { CartItemsType } from "../types/cart";

export default function Cart() {
  const [cartItems, setCartItems] =
    useState<CartItemsType[]>(mockCartItems);

  const removeItemFromCart = (id: string): void => {
    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  const quantidadeTotal = cartItems.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const valorTotal = cartItems.reduce(
    (total, item) =>
      total + item.preco * item.quantidade,
    0
  );

  return (
    <main>
      <div className="container p-5">
        <CartList
          cartItems={cartItems}
          removeItemFromCart={removeItemFromCart}
        />

        <CartSummary
          quantidadeTotal={quantidadeTotal}
          valorTotal={valorTotal}
        />
      </div>
    </main>
  );
}
