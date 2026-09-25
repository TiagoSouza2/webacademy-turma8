import type { Produto } from "../interfaces/Produto.js";


export class Carrinho {

  constructor(
    public readonly id: string,
    private produtos: Produto[] = []
  ) {}


  adicionarProduto<T extends Produto>(
    produto: T
  ): void {

    this.produtos.push(
      produto
    );

  }


  getProdutos(): readonly Produto[] {

    return [
      ...this.produtos
    ];

  }


  getNumProdutos(): number {

    return this.produtos.length;

  }


  private somarValores<T extends Produto>(
    produtos: T[]
  ): number {

    return produtos.reduce(
      (total, produto) => {

        return (
          total +
          produto.getValor()
        );

      },
      0
    );

  }


  getValorTotal(): number {

    return this.somarValores(
      this.produtos
    );

  }

}