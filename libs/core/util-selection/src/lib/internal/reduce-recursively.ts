export function reduceRecursively<T, U>({
  item,
  getItems,
  reducer,
  initialValue,
}: {
  item: T;
  getItems: (item: T) => T[];
  initialValue: U;
  reducer: (accumulator: U, item: T, parent?: T) => U;
}): U {
  const items = [item];
  let value = reducer(initialValue, item);

  while (items.length) {
    const current = items.shift();

    if (current) {
      for (const child of getItems(current)) {
        value = reducer(value, child, current);
        items.push(child);
      }
    }
  }

  return value;
}
