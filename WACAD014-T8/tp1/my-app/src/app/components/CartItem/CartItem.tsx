type CartItemProps = {
  nome: string;
  preco: number;
  quantidade: number;
};

export function CartItem({
  nome,
  preco,
  quantidade,
}: CartItemProps) {
  return (
    <div className="card mb-3 border-0 shadow-sm rounded-4">
      <div className="card-body">
        <h6 className="card-title fw-semibold">
          {nome}
        </h6>

        <p className="mb-1">
          Preço: R$ {preco.toFixed(2)}
        </p>

        <p className="mb-1">
          Quantidade: {quantidade}
        </p>

        <p className="fw-bold mb-0">
          Subtotal: R$ {(preco * quantidade).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
