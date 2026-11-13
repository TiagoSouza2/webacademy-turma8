
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { productsApi } from "../../services/api";
import type { Product } from "../../types/product";

export default function ProductDetail() {
  const params = useParams<{ produto: string }>();

  const productId = params.produto;

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<Product>({
    queryKey: ["product", productId],

    queryFn: async (): Promise<Product> => {
      const response = await productsApi.get<Product>(
        `/produto/${encodeURIComponent(productId)}`
      );

      return response.data;
    },
  });

  if (isLoading) {
    return (
      <main className="container p-5">
        <p>Carregando produto...</p>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="container p-5">
        <div className="alert alert-danger">
          Erro ao carregar os detalhes do produto.
        </div>

        <Link href="/" className="btn btn-primary">
          Voltar para produtos
        </Link>
      </main>
    );
  }

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4 border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-md-5">
                {product.fotos[0] && (
                  <Image
                    src={product.fotos[0].src}
                    alt={product.fotos[0].titulo}
                    width={500}
                    height={500}
                    className="img-fluid rounded-4"
                  />
                )}
              </div>

              <div className="col-md-7">
                <h2 className="fw-bold mb-3">
                  {product.nome}
                </h2>

                <h3 className="text-primary fw-bold mb-4">
                  R$ {Number(product.preco).toFixed(2)}
                </h3>

                <h5 className="fw-semibold">
                  Descrição
                </h5>

                <p className="text-muted">
                  {product.descricao}
                </p>

                <Link
                  href="/"
                  className="btn btn-primary rounded-3 mt-3"
                >
                  Voltar para produtos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
