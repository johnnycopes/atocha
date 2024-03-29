import { GetChildren, GetId, Ids } from '../../shared/types';
import { bfsReduce } from '../../shared/bfs-reduce';

export type IdsMap = Map<string, { parentId?: string; childrenIds: Ids }>;

export function createMap<T>(
  root: T,
  getId: GetId<T>,
  getChildren: GetChildren<T>
): IdsMap {
  return bfsReduce<T, IdsMap>({
    root,
    getChildren,
    initialValue: new Map(),
    reducer: (accum, node, parent) =>
      accum.set(getId(node), {
        parentId: parent ? getId(parent) : undefined,
        childrenIds: getChildren(node).map(getId),
      }),
  });
}
