import { reduceRecursively } from './reduce-recursively';

export type Counts = Record<string, number>;

export function getCounts<T>(
  tree: T,
  getId: (item: T) => string,
  getChildren: (item: T) => readonly T[],
  getLeafNodeCount: (item: T) => number
) {
  return reduceRecursively<T, Counts>({
    item: tree,
    getItems: getChildren,
    initialValue: {},
    reducer: (accum, curr) => {
      accum[getId(curr)] = reduceRecursively({
        item: curr,
        getItems: getChildren,
        initialValue: 0,
        reducer: (total, item) => total + getLeafNodeCount(item),
      });
      return accum;
    },
  });
}
