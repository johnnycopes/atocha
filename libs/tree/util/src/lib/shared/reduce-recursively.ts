import { GetChildren, Node } from './types';

export function reduceRecursively<T, U>({
  root,
  getChildren,
  reducer,
  initialValue,
}: {
  root: Node<T>;
  getChildren: GetChildren<T>;
  initialValue: U;
  reducer: (accumulator: U, node: Node<T>, parent?: T) => U;
}): U {
  const items = [root];
  let value = reducer(initialValue, root);

  while (items.length) {
    const current = items.shift();

    if (current) {
      for (const child of getChildren(current)) {
        value = reducer(value, child, current);
        items.push(child);
      }
    }
  }

  return value;
}
