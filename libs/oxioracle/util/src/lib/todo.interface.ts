export interface Todo {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
}

export type EditableTodo = Omit<Todo, 'id'>;
