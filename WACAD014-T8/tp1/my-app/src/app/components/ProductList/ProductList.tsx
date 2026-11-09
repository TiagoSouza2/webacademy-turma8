import { ProductCard } from "../ProductCard/ProductCard";

export function ProductList() {
  const produtos = [
    {
      id: 1,
      nome: "Notebook Pro",
      preco: 5499,
      imagem: "/placeholder.png",
    },
    {
      id: 2,
      nome: "Smartphone Premium",
      preco: 4399,
      imagem: "/placeholder.png",
    },
    {
      id: 3,
      nome: "Smartwatch Sport",
      preco: 1899,
      imagem: "/placeholder.png",
    },
    {
      id: 4,
      nome: "Fone Bluetooth ANC",
      preco: 999,
      imagem: "/placeholder.png",
    },
  ];

  return (
    <>
      <h5 className="mb-3">
        Produtos disponíveis:
      </h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {produtos.map((produto) => (
          <ProductCard
            key={produto.id}
            nome={produto.nome}
            preco={produto.preco}
            imagem={produto.imagem}
          />
        ))}
      </div>
    </>
  );
}
