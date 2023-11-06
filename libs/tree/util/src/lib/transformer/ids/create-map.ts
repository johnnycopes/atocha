import { GetChildren, GetId, Node } from '../../shared/types';
import { reduceRecursively } from '../../shared/reduce-recursively';

export type IdsMap = Map<
  string,
  { parentId: string | undefined; childrenIds: readonly string[] }
>;

export function createMap<T>(
  root: Node<T>,
  getId: GetId<T>,
  getChildren: GetChildren<T>
): IdsMap {
  return reduceRecursively<T, IdsMap>({
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
