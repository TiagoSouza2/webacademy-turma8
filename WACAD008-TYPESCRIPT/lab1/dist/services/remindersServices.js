const reminders = [];
export function createReminder(title, deadline, description) {
    const reminder = [
        crypto.randomUUID(),
        title,
        new Date(),
        deadline,
        description
    ];
    reminders.push(reminder);
    return reminder;
}
export function getReminders() {
    return reminders;
}
export function deleteReminder(id) {
    const index = reminders.findIndex((reminder) => reminder[0] === id);
    if (index === -1) {
        return false;
    }
    reminders.splice(index, 1);
    return true;
}
export function updateReminder(id, title, deadline, description) {
    const index = reminders.findIndex((reminder) => reminder[0] === id);
    if (index === -1) {
        return undefined;
    }
    const oldReminder = reminders[index];
    const updatedReminder = [
        oldReminder[0],
        title,
        oldReminder[2],
        deadline,
        description
    ];
    reminders[index] = updatedReminder;
    return updatedReminder;
}
