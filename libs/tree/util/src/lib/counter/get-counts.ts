import { reduceRecursively } from '../shared/reduce-recursively';
import { GetChildren, GetId, GetLeafCount, Tree } from '../shared/types';

export type Counts = Readonly<MutableCounts>;
type MutableCounts = Record<string, number>;

export function getCounts<T>(
  tree: Tree<T>,
  getId: GetId<T>,
  getChildren: GetChildren<T>,
  getLeafCount: GetLeafCount<T>
): Counts {
  return reduceRecursively<T, MutableCounts>({
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
