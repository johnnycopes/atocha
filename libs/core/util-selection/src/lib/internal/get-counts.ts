import { reduceRecursively } from './reduce-recursively';
import { GetChildren, GetId, GetLeafCount } from './types';

export type Counts = Record<string, number>;

export function getCounts<T>(
  tree: T,
  getId: GetId<T>,
  getChildren: GetChildren<T>,
  getLeafNodeCount: GetLeafCount<T>
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
