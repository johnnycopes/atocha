import { GetChildren, GetId, Tree } from './types';
import { IdsMap, createMap } from './create-map';
import { reduceRecursively } from './reduce-recursively';

export class Ids<T> {
  private readonly _map: IdsMap;
  readonly descending: readonly string[];
  readonly ascending: readonly string[];

  constructor(
    private _tree: Tree<T>,
    private _getId: GetId<T>,
    private _getChildren: GetChildren<T>
  ) {
    this._map = createMap(this._tree, this._getId, this._getChildren);
    this.descending = Array.from(this._map.keys());
    this.ascending = this.descending.slice().reverse();
  }

  getChildrenIds(id: string): readonly string[] {
    return this._map.get(id)?.childrenIds ?? [];
  }

  getConnectedIds(id: string): {
    itemAndDescendantsIds: string[];
    ancestorIds: string[];
  } {
    const itemAndDescendantsIds = reduceRecursively<string, string[]>({
      item: id,
      getItems: (id: string) => this._map.get(id)?.childrenIds ?? [], // TODO: call getChildrenIds
      initialValue: [],
      reducer: (accum, curr) => {
        accum.push(curr);
        return accum;
      },
    });

    const ancestorIds = reduceRecursively<string, string[]>({
      item: id,
      getItems: (id) => {
        const parentId = this._map.get(id)?.parentId;
        return parentId ? [parentId] : [];
      },
      initialValue: [],
      reducer: (accum, curr) => {
        if (id !== curr) accum.push(curr);
        return accum;
      },
    });

    return { ancestorIds, itemAndDescendantsIds };
  }
}
