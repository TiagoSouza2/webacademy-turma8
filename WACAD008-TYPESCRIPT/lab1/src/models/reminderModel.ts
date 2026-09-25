export type Reminder = [
  id: string,
  title: string,
  createdAt: Date,
  deadline: Date | undefined,
  description: string | undefined
];