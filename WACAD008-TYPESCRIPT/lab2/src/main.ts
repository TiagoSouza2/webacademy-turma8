import { Aluno } from "./models/Aluno.js";

import { Turma } from "./models/Turma.js";


// CRIA A TURMA

const turma =
  new Turma(
    crypto.randomUUID(),
    "Turma de Educação Física"
  );


// FORMULÁRIO

const form =
  document.querySelector<HTMLFormElement>(
    "#studentForm"
  )!;


const nameInput =
  document.querySelector<HTMLInputElement>(
    "#name"
  )!;


const ageInput =
  document.querySelector<HTMLInputElement>(
    "#age"
  )!;


const heightInput =
  document.querySelector<HTMLInputElement>(
    "#height"
  )!;


const weightInput =
  document.querySelector<HTMLInputElement>(
    "#weight"
  )!;


const submitButton =
  document.querySelector<HTMLButtonElement>(
    "#submitButton"
  )!;


const cancelButton =
  document.querySelector<HTMLButtonElement>(
    "#cancelButton"
  )!;


// LISTA

const studentsList =
  document.querySelector<HTMLDivElement>(
    "#studentsList"
  )!;


// ESTATÍSTICAS

const numAlunos =
  document.querySelector<HTMLElement>(
    "#numAlunos"
  )!;


const mediaIdades =
  document.querySelector<HTMLElement>(
    "#mediaIdades"
  )!;


const mediaAlturas =
  document.querySelector<HTMLElement>(
    "#mediaAlturas"
  )!;


const mediaPesos =
  document.querySelector<HTMLElement>(
    "#mediaPesos"
  )!;


// CONTROLE DE EDIÇÃO

let editingId:
  string | null = null;


let editingElement:
  HTMLDivElement | null = null;


/*
  ATUALIZA AS ESTATÍSTICAS
*/

function atualizarEstatisticas(): void {

  numAlunos.textContent =
    String(
      turma.getNumAlunos()
    );


  mediaIdades.textContent =
    turma
      .getMediaIdades()
      .toFixed(1);


  mediaAlturas.textContent =
    turma
      .getMediaAlturas()
      .toFixed(2);


  mediaPesos.textContent =
    turma
      .getMediaPesos()
      .toFixed(1);

}


/*
  CRIA O ELEMENTO HTML
  QUE REPRESENTA UM ALUNO
*/

function criarElementoAluno(
  aluno: Aluno
): HTMLDivElement {

  const alunoDiv =
    document.createElement(
      "div"
    );


  alunoDiv.classList.add(
    "student"
  );


  // NOME

  const nome =
    document.createElement(
      "h3"
    );


  nome.textContent =
    aluno.nomeCompleto;


  // IDADE

  const idade =
    document.createElement(
      "p"
    );


  idade.textContent =
    `Idade: ${aluno.idade} anos`;


  // ALTURA

  const altura =
    document.createElement(
      "p"
    );


  altura.textContent =
    `Altura: ${aluno.altura.toFixed(2)} m`;


  // PESO

  const peso =
    document.createElement(
      "p"
    );


  peso.textContent =
    `Peso: ${aluno.peso.toFixed(1)} kg`;


  // EDITAR

  const editButton =
    document.createElement(
      "button"
    );


  editButton.textContent =
    "Editar";


  // EXCLUIR

  const deleteButton =
    document.createElement(
      "button"
    );


  deleteButton.textContent =
    "Excluir";


  /*
    EVENTO EDITAR
  */

  editButton.addEventListener(
    "click",
    () => {

      editingId =
        aluno.id;


      editingElement =
        alunoDiv;


      nameInput.value =
        aluno.nomeCompleto;


      ageInput.value =
        String(
          aluno.idade
        );


      heightInput.value =
        String(
          aluno.altura
        );


      weightInput.value =
        String(
          aluno.peso
        );


      submitButton.textContent =
        "Salvar alteração";


      cancelButton.hidden =
        false;


      nameInput.focus();

    }
  );


  /*
    EVENTO EXCLUIR
  */

  deleteButton.addEventListener(
    "click",
    () => {

      const confirmar =
        window.confirm(
          "Deseja excluir este aluno?"
        );


      if (!confirmar) {

        return;

      }


      const removido =
        turma.removerAluno(
          aluno.id
        );


      if (!removido) {

        alert(
          "Aluno não encontrado."
        );

        return;

      }


      // REMOVE APENAS ESSE ELEMENTO

      alunoDiv.remove();


      if (
        editingId === aluno.id
      ) {

        resetarFormulario();

      }


      atualizarEstatisticas();

    }
  );


  alunoDiv.append(
    nome,
    idade,
    altura,
    peso,
    editButton,
    deleteButton
  );


  return alunoDiv;

}


/*
  RESET DO FORMULÁRIO
*/

function resetarFormulario(): void {

  form.reset();


  editingId =
    null;


  editingElement =
    null;


  submitButton.textContent =
    "Cadastrar aluno";


  cancelButton.hidden =
    true;

}


/*
  SUBMIT
*/

form.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const nomeCompleto =
      nameInput.value.trim();


    /*
      valueAsNumber já transforma
      o valor do input em number.
    */

    const idade =
      ageInput.valueAsNumber;


    const altura =
      heightInput.valueAsNumber;


    const peso =
      weightInput.valueAsNumber;


    /*
      VALIDAÇÕES
    */

    if (
      nomeCompleto === ""
    ) {

      alert(
        "Informe o nome do aluno."
      );

      return;

    }


    if (
      Number.isNaN(idade) ||
      idade <= 0
    ) {

      alert(
        "Informe uma idade válida."
      );

      return;

    }


    if (
      Number.isNaN(altura) ||
      altura <= 0
    ) {

      alert(
        "Informe uma altura válida."
      );

      return;

    }


    if (
      Number.isNaN(peso) ||
      peso <= 0
    ) {

      alert(
        "Informe um peso válido."
      );

      return;

    }


    /*
      EDIÇÃO
    */

    if (
      editingId !== null &&
      editingElement !== null
    ) {

      const alunoAtualizado =
        turma.editarAluno(
          editingId,
          nomeCompleto,
          idade,
          altura,
          peso
        );


      if (!alunoAtualizado) {

        alert(
          "Aluno não encontrado."
        );

        return;

      }


      /*
        Cria apenas o elemento
        atualizado e substitui
        o antigo.
      */

      const novoElemento =
        criarElementoAluno(
          alunoAtualizado
        );


      editingElement.replaceWith(
        novoElemento
      );


      resetarFormulario();


      atualizarEstatisticas();


      return;

    }


    /*
      CADASTRO
    */

    const aluno =
      new Aluno(
        crypto.randomUUID(),
        nomeCompleto,
        idade,
        altura,
        peso
      );


    turma.adicionarAluno(
      aluno
    );


    const alunoElement =
      criarElementoAluno(
        aluno
      );


    studentsList.appendChild(
      alunoElement
    );


    resetarFormulario();


    atualizarEstatisticas();

  }
);


/*
  CANCELAR EDIÇÃO
*/

cancelButton.addEventListener(
  "click",
  () => {

    resetarFormulario();

  }
);


/*
  ESTATÍSTICAS INICIAIS
*/

atualizarEstatisticas();