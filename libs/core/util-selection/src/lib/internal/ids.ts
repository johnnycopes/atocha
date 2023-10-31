import { reduceRecursively } from './reduce-recursively';

export type IdsMap = Map<
  string,
  { parentId: string | undefined; childrenIds: string[] }
>;

export class Ids<T> {
  readonly map: IdsMap;
  readonly descending: readonly string[];
  readonly ascending: readonly string[];

  constructor(
    private _tree: T,
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => T[]
  ) {
    this.map = reduceRecursively<T, IdsMap>({
      item: this._tree,
      getItems: this._getChildren,
      initialValue: new Map(),
      reducer: (accum, item, parent) =>
        accum.set(this._getId(item), {
          parentId: parent ? this._getId(parent) : undefined,
          childrenIds: this._getChildren(item).map(this._getId),
        }),
    });

    this.descending = Array.from(this.map.keys());
    this.ascending = this.descending.slice().reverse();
  }

  getConnectedIds(id: string): {
    itemAndDescendantsIds: string[];
    ancestorIds: string[];
  } {
    const itemAndDescendantsIds = reduceRecursively<string, string[]>({
      item: id,
      getItems: (id: string) => this.map.get(id)?.childrenIds ?? [],
      initialValue: [],
      reducer: (accum, curr) => {
        accum.push(curr);
        return accum;
      },
    });

    const ancestorIds = reduceRecursively<string, string[]>({
      item: id,
      getItems: (id) => {
        const parentId = this.map.get(id)?.parentId;
        return parentId ? [parentId] : [];
      },
      initialValue: [],
      reducer: (accum, curr) => {
        if (id === curr) return accum;
        accum.push(curr);
        return accum;
      },
    });

    return { ancestorIds, itemAndDescendantsIds };
  }
}
