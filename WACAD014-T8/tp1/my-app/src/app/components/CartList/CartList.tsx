import { CartItem } from "../CartItem/CartItem";

export function CartList() {
  const itens = [
    {
      id: 1,
      nome: "Teclado Mecânico",
      preco: 350,
      quantidade: 1,
    },
    {
      id: 2,
      nome: "Mouse Gamer",
      preco: 200,
      quantidade: 2,
    },
    {
      id: 3,
      nome: "Headset",
      preco: 600,
      quantidade: 1,
    },
  ];

  return (
    <>
      <h5 className="mb-3">
        Produtos no carrinho:
      </h5>

      {itens.map((item) => (
        <CartItem
          key={item.id}
          nome={item.nome}
          preco={item.preco}
          quantidade={item.quantidade}
        />
      ))}
    </>
  );
}
