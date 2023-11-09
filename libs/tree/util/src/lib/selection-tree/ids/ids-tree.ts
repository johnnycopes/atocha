import { GetChildren, GetId, IdsArray } from '../../shared/types';
import { bfsReduce } from '../../shared/bfs-reduce';
import { IdsMap, createMap } from './create-map';
import { ITree, Tree } from '../../tree';

export interface IIdsTree<T> extends ITree<T> {
  readonly descendingIds: IdsArray;
  readonly ascendingIds: IdsArray;
}

export class IdsTree<T> extends Tree<T> implements IIdsTree<T> {
  private readonly _map: IdsMap;
  readonly descendingIds: IdsArray;
  readonly ascendingIds: IdsArray;

  constructor(root: T, getId: GetId<T>, getChildren: GetChildren<T>) {
    super(root, getId, getChildren);
    this._map = createMap(this.root, this.getId, this.getChildren);
    this.descendingIds = Array.from(this._map.keys());
    this.ascendingIds = this.descendingIds.slice().reverse();
  }

  getChildrenIds(id: string): IdsArray {
    return this._map.get(id)?.childrenIds ?? [];
  }

  getConnectedIds(id: string): Readonly<{
    nodeAndDescendantIds: IdsArray;
    ancestorIds: IdsArray;
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
