export function actRecursively<TItem, TAccumulator>({
  item,
  getChildren,
  reducer,
  accumulator,
}: {
  item: TItem;
  getChildren: (item: TItem) => TItem[];
  reducer: (accumulator: TAccumulator, item: TItem, parent?: TItem) => TAccumulator;
  accumulator: TAccumulator;
}): TAccumulator {
  const items = [item];
  let reducedValue = reducer(accumulator, item);

  while (items.length) {
    const current = items.shift();

    if (current) {
      const children = getChildren(current);

      if (children.length) {
        children.forEach((child) => {
          reducedValue = reducer(reducedValue, child, current);
          items.push(child);
        });
      }
    }
  }

  return reducedValue;
}
