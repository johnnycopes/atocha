import { reduceRecursively } from '../shared/reduce-recursively';
import { GetChildren, GetId, GetLeafCount } from '../shared/types';

export type Counts = Record<string, number>;

export function getCounts<T>(
  tree: T,
  getId: GetId<T>,
  getChildren: GetChildren<T>,
  getLeafCount: GetLeafCount<T>
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
        reducer: (total, item) => total + getLeafCount(item),
      });
      return accum;
    },
  });
}
