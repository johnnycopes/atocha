import { reduceRecursively } from '../shared/reduce-recursively';
import {
  Counts,
  GetChildren,
  GetId,
  GetLeafCount,
  MutableCounts,
  Node,
} from '../shared/types';

export function getCounts<T>(
  root: Node<T>,
  getId: GetId<T>,
  getChildren: GetChildren<T>,
  getLeafCount: GetLeafCount<T>
): Counts {
  return reduceRecursively<T, MutableCounts>({
    item: root,
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
