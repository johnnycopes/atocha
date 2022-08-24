export function actRecursively<T, U>({
  item,
  getChildren,
  reducer,
  initialValue,
}: {
  item: T;
  getChildren: (item: T) => T[];
  reducer: (initialValue: U, item: T, parent?: T) => U;
  initialValue: U;
}): U {
  const items = [item];
  let value = reducer(initialValue, item);

  while (items.length) {
    const current = items.shift();

    if (current) {
      const children = getChildren(current);

      if (children.length) {
        children.forEach((child) => {
          value = reducer(value, child, current);
          items.push(child);
        });
      }
    }
  }

  return value;
}
