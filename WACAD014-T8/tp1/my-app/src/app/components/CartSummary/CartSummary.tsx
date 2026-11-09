type CartSummaryProps = {
  quantidade: number;
  total: number;
};

export function CartSummary({
  quantidade,
  total,
}: CartSummaryProps) {
  return (
    <div className="card mb-4 border-0 shadow-sm rounded-4">
      <div className="card-body">
        <h5 className="card-title mb-4 fw-semibold">
          Resumo do Carrinho
        </h5>

        <p className="card-text fw-medium">
          Quantidade total: {quantidade}
        </p>

        <p className="card-text fw-medium">
          Valor total: R$ {total.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
