import { reduceRecursively } from '../../reduce-recursively';

export type IdsMap = Map<
  string,
  { parentId: string | undefined; childrenIds: string[] }
>;

export function createIdsMap<T>(
  tree: T,
  getId: (tree: T) => string,
  getChildren: (tree: T) => T[]
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
