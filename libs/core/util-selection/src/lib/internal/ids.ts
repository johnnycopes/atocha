import { reduceRecursively } from '../reduce-recursively';

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
}
