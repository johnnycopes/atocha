export function actRecursively<TItem, TAccumulator>({
  item,
  getChildren,
  reducer,
  accumulator,
}: {
  item: TItem;
  getChildren: (item: TItem) => TItem[];
  reducer: (accumulator: TAccumulator, item: TItem) => TAccumulator;
  accumulator: TAccumulator;
}): TAccumulator {
  const items = [item];

  while (items.length) {
    const current = items.shift();

    if (current) {
      accumulator = reducer(accumulator, current);
      const children = getChildren(current);

      if (children.length) {
        children.forEach((child) => {
          items.push(child);
        });
      }
    }
  }

  return accumulator;
}

// const output: ItemsRecord<T> = {
//   [this.getId(item)]: {
//     item,
//     parentId: undefined,
//   },
// };
// const items = [item];

// while (items.length) {
//   const current = items.shift();
//   if (current) {
//     const children = this.getChildren(current);
//     if (children.length) {
//       children.forEach((child) => {
//         output[this.getId(child)] = {
//           item: child,
//           parentId: this.getId(current),
//         };
//         items.push(child);
//       });
//     }
//   }
// }

// return output;
