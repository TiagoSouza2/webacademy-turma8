import {Reminder} from '../models/reminderModel.js'

const reminders: Reminder[] = [];

export function createReminder(
  title: string,
  deadline?: Date,
  description?: string
): Reminder {

  const reminder: Reminder = [
    crypto.randomUUID(),
    title,
    new Date(),
    deadline,
    description
  ];

  reminders.push(reminder);

  return reminder;
}


export function getReminders(): Reminder[] {
  return reminders;
}


export function deleteReminder(id: string): boolean {

  const index = reminders.findIndex(
    (reminder) => reminder[0] === id
  );

  if (index === -1) {
    return false;
  }

  reminders.splice(index, 1);

  return true;
}


export function updateReminder(
  id: string,
  title: string,
  deadline?: Date,
  description?: string
): Reminder | undefined {

  const index = reminders.findIndex(
    (reminder) => reminder[0] === id
  );

  if (index === -1) {
    return undefined;
  }

  const oldReminder = reminders[index];

  const updatedReminder: Reminder = [
    oldReminder[0],
    title,
    oldReminder[2],
    deadline,
    description
  ];

  reminders[index] = updatedReminder;

  return updatedReminder;
}