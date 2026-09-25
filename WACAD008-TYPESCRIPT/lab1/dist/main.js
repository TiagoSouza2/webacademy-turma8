import { createReminder, deleteReminder, updateReminder } from "./services/remindersServices.js";
const form = document.querySelector("#reminderForm");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const deadlineInput = document.querySelector("#deadline");
const remindersList = document.querySelector("#remindersList");
// ID DO REMINDER QUE ESTÁ SENDO EDITADO
let editingId = null;
// ELEMENTO HTML QUE ESTÁ SENDO EDITADO
let editingElement = null;
// CRIA O HTML DE UM REMINDER
function createReminderElement(reminder) {
    const reminderDiv = document.createElement("div");
    // TÍTULO
    const title = document.createElement("h3");
    title.textContent =
        reminder[1];
    // DESCRIÇÃO
    const description = document.createElement("p");
    description.textContent =
        reminder[4] ?? "Sem descrição";
    // DATA DE CRIAÇÃO
    const createdAt = document.createElement("p");
    createdAt.textContent =
        `Criado em: ${reminder[2].toLocaleString("pt-BR")}`;
    // DATA LIMITE
    const deadline = document.createElement("p");
    if (reminder[3]) {
        deadline.textContent =
            `Prazo: ${reminder[3].toLocaleString("pt-BR")}`;
    }
    else {
        deadline.textContent =
            "Sem prazo definido";
    }
    // BOTÃO EDITAR
    const editButton = document.createElement("button");
    editButton.textContent =
        "Editar";
    // BOTÃO EXCLUIR
    const deleteButton = document.createElement("button");
    deleteButton.textContent =
        "Excluir";
    // EVENTO DE EDITAR
    editButton.addEventListener("click", () => {
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
                formatDateForInput(reminder[3]);
        }
        else {
            deadlineInput.value =
                "";
        }
    });
    // EVENTO DE EXCLUIR
    deleteButton.addEventListener("click", () => {
        const deleted = deleteReminder(reminder[0]);
        if (deleted) {
            reminderDiv.remove();
        }
    });
    // ADICIONA OS ELEMENTOS NA DIV
    reminderDiv.append(title, description, createdAt, deadline, editButton, deleteButton);
    return reminderDiv;
}
// SUBMIT DO FORMULÁRIO
form.addEventListener("submit", (event) => {
    event.preventDefault();
    // PEGA OS DADOS
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const deadlineValue = deadlineInput.value;
    // VALIDAÇÃO DO TÍTULO
    if (title === "") {
        alert("O título é obrigatório.");
        return;
    }
    // CONVERTE A DATA DO INPUT
    const deadline = deadlineValue
        ? new Date(deadlineValue)
        : undefined;
    /*
      EDITANDO UM REMINDER
    */
    if (editingId !== null &&
        editingElement !== null) {
        const updatedReminder = updateReminder(editingId, title, deadline, description || undefined);
        if (!updatedReminder) {
            alert("Não foi possível editar o lembrete.");
            return;
        }
        // CRIA A NOVA VERSÃO DO ELEMENTO
        const updatedElement = createReminderElement(updatedReminder);
        // SUBSTITUI A DIV ANTIGA
        editingElement.replaceWith(updatedElement);
        // SAI DO MODO DE EDIÇÃO
        editingId = null;
        editingElement = null;
        form.reset();
        return;
    }
    /*
      CRIANDO UM NOVO REMINDER
    */
    const reminder = createReminder(title, deadline, description || undefined);
    // CRIA O ELEMENTO HTML
    const reminderElement = createReminderElement(reminder);
    // ADICIONA NA TELA
    remindersList.appendChild(reminderElement);
    // LIMPA O FORMULÁRIO
    form.reset();
});
// CONVERTE UMA DATE PARA DATETIME-LOCAL
function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return (`${year}-${month}-${day}` +
        `T${hours}:${minutes}`);
}
