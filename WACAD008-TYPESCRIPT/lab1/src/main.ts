import type { Reminder } from "./models/reminderModel.js";

import {
  createReminder,
  deleteReminder,
  updateReminder
} from "./services/remindersServices.js";

const form =
  document.querySelector<HTMLFormElement>(
    "#reminderForm"
  )!;

const titleInput =
  document.querySelector<HTMLInputElement>(
    "#title"
  )!;

const descriptionInput =
  document.querySelector<HTMLTextAreaElement>(
    "#description"
  )!;

const deadlineInput =
  document.querySelector<HTMLInputElement>(
    "#deadline"
  )!;

const remindersList =
  document.querySelector<HTMLDivElement>(
    "#remindersList"
  )!;


let editingId: string | null = null;


let editingElement: HTMLDivElement | null = null;


function createReminderElement(
  reminder: Reminder
): HTMLDivElement {

  const reminderDiv =
    document.createElement("div");


  const title =
    document.createElement("h3");

  title.textContent =
    reminder[1];


  const description =
    document.createElement("p");

  description.textContent =
    reminder[4] ?? "Sem descrição";


  const createdAt =
    document.createElement("p");

  createdAt.textContent =
    `Criado em: ${reminder[2].toLocaleString("pt-BR")
    }`;


  const deadline =
    document.createElement("p");

  if (reminder[3]) {

    deadline.textContent =
      `Prazo: ${reminder[3].toLocaleString("pt-BR")
      }`;

  } else {

    deadline.textContent =
      "Sem prazo definido";

  }


  const editButton =
    document.createElement("button");

  editButton.textContent =
    "Editar";


  const deleteButton =
    document.createElement("button");

  deleteButton.textContent =
    "Excluir";


  editButton.addEventListener(
    "click",
    () => {

      editingId =
        reminder[0];

      editingElement =
        reminderDiv;


      titleInput.value =
        reminder[1];


      descriptionInput.value =
        reminder[4] ?? "";


      if (reminder[3]) {

        deadlineInput.value =
          formatDateForInput(
            reminder[3]
          );

      } else {

        deadlineInput.value =
          "";

      }

    }
  );


  deleteButton.addEventListener(
    "click",
    () => {

      const deleted =
        deleteReminder(
          reminder[0]
        );


      if (deleted) {

        reminderDiv.remove();

      }

    }
  );


  reminderDiv.append(
    title,
    description,
    createdAt,
    deadline,
    editButton,
    deleteButton
  );


  return reminderDiv;
}


form.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const title =
      titleInput.value.trim();

    const description =
      descriptionInput.value.trim();

    const deadlineValue =
      deadlineInput.value;


    if (title === "") {

      alert(
        "O título é obrigatório."
      );

      return;

    }


    const deadline: Date | undefined =
      deadlineValue
        ? new Date(deadlineValue)
        : undefined;



    if (
      editingId !== null &&
      editingElement !== null
    ) {

      const updatedReminder =
        updateReminder(
          editingId,
          title,
          deadline,
          description || undefined
        );


      if (!updatedReminder) {

        alert(
          "Não foi possível editar o lembrete."
        );

        return;

      }


      const updatedElement =
        createReminderElement(
          updatedReminder
        );


      editingElement.replaceWith(
        updatedElement
      );


      editingId = null;

      editingElement = null;


      form.reset();

      return;
    }


    const reminder =
      createReminder(
        title,
        deadline,
        description || undefined
      );


    const reminderElement =
      createReminderElement(
        reminder
      );


    remindersList.appendChild(
      reminderElement
    );


    form.reset();

  }
);


function formatDateForInput(
  date: Date
): string {

  const year =
    date.getFullYear();


  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    );


  const hours =
    String(
      date.getHours()
    ).padStart(
      2,
      "0"
    );


  const minutes =
    String(
      date.getMinutes()
    ).padStart(
      2,
      "0"
    );


  return (
    `${year}-${month}-${day}` +
    `T${hours}:${minutes}`
  );
}