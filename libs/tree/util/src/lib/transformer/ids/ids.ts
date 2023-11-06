import { GetChildren, GetId, Node } from '../../shared/types';
import { bfsReduce } from '../../shared/reduce-recursively';
import { IdsMap, createMap } from './create-map';

export class Ids<T> {
  private readonly _map: IdsMap;
  readonly descending: readonly string[];
  readonly ascending: readonly string[];

  constructor(
    private _root: Node<T>,
    private _getId: GetId<T>,
    private _getChildren: GetChildren<T>
  ) {
    this._map = createMap(this._root, this._getId, this._getChildren);
    this.descending = Array.from(this._map.keys());
    this.ascending = this.descending.slice().reverse();
  }

  getChildrenIds(id: string): readonly string[] {
    return this._map.get(id)?.childrenIds ?? [];
  }

  getConnectedIds(id: string): Readonly<{
    itemAndDescendantsIds: readonly string[];
    ancestorIds: readonly string[];
  }> {
    const itemAndDescendantsIds = bfsReduce<string, string[]>({
      root: id,
      getChildren: (id) => this.getChildrenIds(id),
      initialValue: [],
      reducer: (accum, curr) => {
        accum.push(curr);
        return accum;
      },
    });

    const ancestorIds = bfsReduce<string, string[]>({
      root: id,
      getChildren: (id) => {
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
