import { GetChildren, GetId } from '../../shared/types';
import { bfsReduce } from '../../shared/bfs-reduce';
import { IdsMap, createMap } from './create-map';

export class IdsTree<T> {
  private readonly _map: IdsMap;
  readonly descendingIds: readonly string[];
  readonly ascendingIds: readonly string[];

  constructor(
    private _root: T,
    private _getId: GetId<T>,
    private _getChildren: GetChildren<T>
  ) {
    this._map = createMap(this._root, this._getId, this._getChildren);
    this.descendingIds = Array.from(this._map.keys());
    this.ascendingIds = this.descendingIds.slice().reverse();
  }

  getChildrenIds(id: string): readonly string[] {
    return this._map.get(id)?.childrenIds ?? [];
  }

  getConnectedIds(id: string): Readonly<{
    nodeAndDescendantIds: readonly string[];
    ancestorIds: readonly string[];
  }> {
    const nodeAndDescendantIds = bfsReduce<string, string[]>({
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

    return { ancestorIds, nodeAndDescendantIds };
  }
}
