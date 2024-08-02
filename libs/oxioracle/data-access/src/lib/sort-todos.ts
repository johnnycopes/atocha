import { Sort, SortDirection } from '@angular/material/sort';

import { Todo } from '@atocha/oxioracle/util';

const sortFns: Record<
  keyof Todo,
  Record<Extract<SortDirection, 'asc' | 'desc'>, (a: Todo, b: Todo) => number>
> = {
  id: {
    asc: (a, b) => Number(a.id) - Number(b.id),
    desc: (a, b) => Number(b.id) - Number(a.id),
  },
  userId: {
    asc: (a, b) => Number(a.userId) - Number(b.userId),
    desc: (a, b) => Number(b.userId) - Number(a.userId),
  },
  title: {
    asc: (a, b) => (a.title > b.title ? 1 : -1),
    desc: (a, b) => (a.title < b.title ? 1 : -1),
  },
  completed: {
    asc: (a, b) => Number(a.completed) - Number(b.completed),
    desc: (a, b) => Number(b.completed) - Number(a.completed),
  },
};

export function sortTodos(todos: Todo[], { active, direction }: Sort): Todo[] {
  if (direction === '') return todos;

  if (!isTodoKey(active)) {
    throw new Error('Passed in Sort key cannot be used to sort todos');
  }

  return [...todos].sort((a, b) => sortFns[active][direction](a, b));
}

function isTodoKey(key: string): key is keyof Todo {
  return (
    key === 'id' || key === 'userId' || key === 'title' || key === 'completed'
  );
}
