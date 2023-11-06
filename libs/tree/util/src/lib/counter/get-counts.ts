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
    root,
    getChildren,
    initialValue: {},
    reducer: (accum, node) => {
      accum[getId(node)] = reduceRecursively({
        root: node,
        getChildren: getChildren,
        initialValue: 0,
        reducer: (total, node) => total + getLeafCount(node),
      });
      return accum;
    },
  });
}
