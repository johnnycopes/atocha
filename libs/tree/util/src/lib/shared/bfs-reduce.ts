import { GetChildren } from './types';

export function bfsReduce<T, U>({
  root,
  getChildren,
  reducer,
  initialValue,
}: {
  root: T;
  getChildren: GetChildren<T>;
  initialValue: U;
  reducer: (accumulator: U, node: T, parent?: T) => U;
}): U {
  const queue = [root];
  let value = reducer(initialValue, root);

  while (queue.length) {
    const current = queue.shift();

    if (current) {
      for (const child of getChildren(current)) {
        value = reducer(value, child, current);
        queue.push(child);
      }
    }
  }

  return value;
}
