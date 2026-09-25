import type { Produto } from "../interfaces/Produto.js";


export class Bicicleta implements Produto {

  constructor(
    private readonly id: string,
    private readonly modelo: string,
    private readonly tamanhoAro: number,
    private readonly fabricante: string,
    private readonly valor: number
  ) {}


  getId(): string {

    return this.id;

  }


  getModelo(): string {

    return this.modelo;

  }


  getFabricante(): string {

    return this.fabricante;

  }


  getValor(): number {

    return this.valor;

  }


  getTipo(): string {

    return "Bicicleta";

  }


  getDetalhes(): string {

    return `Aro ${this.tamanhoAro}`;

  }

}