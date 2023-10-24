export interface Task {
  id?: string;
  title: string;
  completed?: boolean;
  listName?: string;
  createdAt?: Date;
  taskListId?: string;
}