import { reduceRecursively } from './reduce-recursively';

export type IdsMap = Map<
  string,
  { parentId: string | undefined; childrenIds: readonly string[] }
>;

export function createMap<T>(
  tree: T,
  getId: (item: T) => string,
  getChildren: (item: T) => readonly T[]
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
