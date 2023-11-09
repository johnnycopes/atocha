import { bfsReduce } from '../shared/bfs-reduce';
import {
  GetChildren,
  GetId,
  GetLeafCount,
  MutableCounts,
  ReadonlyCounts,
} from '../shared/types';

export function getCounts<T>(
  root: T,
  getId: GetId<T>,
  getChildren: GetChildren<T>,
  getLeafCount: GetLeafCount<T>
): ReadonlyCounts {
  return bfsReduce<T, MutableCounts>({
    root,
    getChildren,
    initialValue: {},
    reducer: (accum, node) => {
      accum[getId(node)] = bfsReduce({
        root: node,
        getChildren,
        initialValue: 0,
        reducer: (total, node) => total + getLeafCount(node),
      });
      return accum;
    },
  });
}
