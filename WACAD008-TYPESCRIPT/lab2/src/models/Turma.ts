import { Aluno } from "./Aluno.js";


type CampoNumericoAluno =
  "idade" |
  "altura" |
  "peso";


export class Turma {

  constructor(
    public id: string,
    public nome: string,
    private alunos: Aluno[] = []
  ) {}


  adicionarAluno(aluno: Aluno): void {

    this.alunos.push(aluno);

  }


  buscarAluno(
    id: string
  ): Aluno | undefined {

    return this.alunos.find(
      (aluno) => aluno.id === id
    );

  }


  editarAluno(
    id: string,
    nomeCompleto: string,
    idade: number,
    altura: number,
    peso: number
  ): Aluno | undefined {

    const aluno =
      this.buscarAluno(id);


    if (!aluno) {

      return undefined;

    }


    aluno.nomeCompleto =
      nomeCompleto;

    aluno.idade =
      idade;

    aluno.altura =
      altura;

    aluno.peso =
      peso;


    return aluno;

  }


  removerAluno(
    id: string
  ): boolean {

    const index =
      this.alunos.findIndex(
        (aluno) =>
          aluno.id === id
      );


    if (index === -1) {

      return false;

    }


    this.alunos.splice(
      index,
      1
    );


    return true;

  }


  getAlunos(): Aluno[] {

    return [...this.alunos];

  }


  getNumAlunos(): number {

    return this.alunos.length;

  }


  /*
    Método genérico usado para evitar
    repetir a mesma lógica nas médias.
  */

  private calcularMedia<
    T extends CampoNumericoAluno
  >(
    campo: T
  ): number {

    if (
      this.alunos.length === 0
    ) {

      return 0;

    }


    const soma =
      this.alunos.reduce(
        (total, aluno) => {

          return (
            total +
            aluno[campo]
          );

        },
        0
      );


    return (
      soma /
      this.alunos.length
    );

  }


  getMediaIdades(): number {

    return this.calcularMedia(
      "idade"
    );

  }


  getMediaAlturas(): number {

    return this.calcularMedia(
      "altura"
    );

  }


  getMediaPesos(): number {

    return this.calcularMedia(
      "peso"
    );

  }

}