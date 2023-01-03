import { reduceRecursively } from '@atocha/core/util';

export type Counts = Record<string, number>;

export class Counter<T> {
  constructor(
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => T[],
    private _getLeafNodeCount: (tree: T) => number = () => 0
  ) {}

  getTotalCounts(tree: T): Counts {
    return this._getCounts(tree, this._getLeafNodeCount);
  }

  getSelectedCounts(tree: T, model: string[]): Counts {
    return this._getCounts(tree, (leafNode: T): number => {
      const leafNodeId = this._getId(leafNode);
      return model.includes(leafNodeId) ? this._getLeafNodeCount(leafNode) : 0;
    });
  }

  private _getCounts(tree: T, getLeafItemCount: (item: T) => number): Counts {
    return reduceRecursively({
      item: tree,
      getItems: this._getChildren,
      initialValue: {} as Counts,
      reducer: (accum, curr) => ({
        ...accum,
        [this._getId(curr)]: reduceRecursively({
          item: curr,
          getItems: this._getChildren,
          initialValue: 0,
          reducer: (total, item) => total + getLeafItemCount(item),
        }),
      }),
    });
  }
}
