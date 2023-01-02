import { reduceRecursively } from '@atocha/core/util';

export type Counts = Record<string, number>;

export class Counter<T> {
  // TODO: pass in tree here so the getCounts result can be cached in the constructor body
  constructor(
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => T[],
    private _getLeafNodeCount: (tree: T) => number = () => 0
  ) {}

  getTotalCounts(tree: T): Counts {
    return this._getCounts(tree, this._getLeafNodeCount);
  }

  getSelectedCounts(tree: T, model: string[]): Counts {
    // TODO: extract this to a private method
    const leafNodeCount = (leafItem: T): number => {
      const leafItemId = this._getId(leafItem);
      return model.includes(leafItemId) ? this._getLeafNodeCount(leafItem) : 0;
    };
    return this._getCounts(tree, leafNodeCount);
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
