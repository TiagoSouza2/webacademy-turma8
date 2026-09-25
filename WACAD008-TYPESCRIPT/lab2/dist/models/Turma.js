export class Turma {
    constructor(id, nome, alunos = []) {
        this.id = id;
        this.nome = nome;
        this.alunos = alunos;
    }
    adicionarAluno(aluno) {
        this.alunos.push(aluno);
    }
    buscarAluno(id) {
        return this.alunos.find((aluno) => aluno.id === id);
    }
    editarAluno(id, nomeCompleto, idade, altura, peso) {
        const aluno = this.buscarAluno(id);
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
    removerAluno(id) {
        const index = this.alunos.findIndex((aluno) => aluno.id === id);
        if (index === -1) {
            return false;
        }
        this.alunos.splice(index, 1);
        return true;
    }
    getAlunos() {
        return [...this.alunos];
    }
    getNumAlunos() {
        return this.alunos.length;
    }
    /*
      Método genérico usado para evitar
      repetir a mesma lógica nas médias.
    */
    calcularMedia(campo) {
        if (this.alunos.length === 0) {
            return 0;
        }
        const soma = this.alunos.reduce((total, aluno) => {
            return (total +
                aluno[campo]);
        }, 0);
        return (soma /
            this.alunos.length);
    }
    getMediaIdades() {
        return this.calcularMedia("idade");
    }
    getMediaAlturas() {
        return this.calcularMedia("altura");
    }
    getMediaPesos() {
        return this.calcularMedia("peso");
    }
}
