import Image from "next/image";

type ProductCardProps = {
  nome: string;
  preco: number;
  imagem: string;
};

export function ProductCard({
  nome,
  preco,
  imagem,
}: ProductCardProps) {
  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
        <Image
          src={imagem}
          className="card-img-top object-fit-cover"
          alt={nome}
          width={300}
          height={350}
        />

        <div className="card-body d-flex flex-column p-3">
          <h6 className="card-title fw-semibold mb-1">
            {nome}
          </h6>

          <p className="fs-5 fw-bold mb-3 text-primary">
            R$ {preco.toFixed(2)}
          </p>

          <button
            className="btn btn-primary d-block w-100 mt-auto rounded-3"
            type="button"
          >
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
