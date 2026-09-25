import type { Produto } from "../interfaces/Produto.js";


export class TV implements Produto {

  constructor(
    private readonly id: string,
    private readonly modelo: string,
    private readonly resolucao: string,
    private readonly tamanhoPolegadas: number,
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

    return "TV";

  }


  getDetalhes(): string {

    return (
      `${this.resolucao} - ` +
      `${this.tamanhoPolegadas} polegadas`
    );

  }

}