import { GetChildren, GetId, Tree } from './types';
import { reduceRecursively } from './reduce-recursively';

export type IdsMap = Map<
  string,
  { parentId: string | undefined; childrenIds: readonly string[] }
>;

export function createMap<T>(
  tree: Tree<T>,
  getId: GetId<T>,
  getChildren: GetChildren<T>
) {
  return reduceRecursively<T, IdsMap>({
    item: tree,
    getItems: getChildren,
    initialValue: new Map(),
    reducer: (accum, item, parent) =>
      accum.set(getId(item), {
        parentId: parent ? getId(parent) : undefined,
        childrenIds: getChildren(item).map(getId),
      }),
  });
}
