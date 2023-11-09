import { bfsReduce } from '../shared/bfs-reduce';
import { GetChildren, GetId, GetLeafCount, Counts } from '../shared/types';

export function getCounts<T>(
  root: T,
  getId: GetId<T>,
  getChildren: GetChildren<T>,
  getLeafCount: GetLeafCount<T>
): Readonly<Counts> {
  return bfsReduce<T, Counts>({
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
