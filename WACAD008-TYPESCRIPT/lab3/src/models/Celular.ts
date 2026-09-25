import type { Produto } from "../interfaces/Produto.js";


export class Celular implements Produto {

  constructor(
    private readonly id: string,
    private readonly modelo: string,
    private readonly memoria: number,
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

    return "Celular";

  }


  getDetalhes(): string {

    return `${this.memoria} GB`;

  }

}