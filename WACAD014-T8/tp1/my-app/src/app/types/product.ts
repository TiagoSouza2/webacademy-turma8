export interface Product {
  id: string;
  nome: string;
  preco: string;
  fotos: {
    titulo: string;
    src: string;
  }[];
  desconto: number;
  descricao: string;
  vendido: string;
  usuario_id: string;
}