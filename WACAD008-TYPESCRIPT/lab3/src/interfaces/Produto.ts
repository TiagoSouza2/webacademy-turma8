export interface Produto {
  getId(): string;
  getModelo(): string;
  getFabricante(): string;
  getValor(): number;
  getTipo(): string;
  getDetalhes(): string;

}