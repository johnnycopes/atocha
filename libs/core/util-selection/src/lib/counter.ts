import { GetChildren, GetId, GetLeafCount, Model } from './internal/types';
import { Counts, getCounts } from './internal/get-counts';

export class Counter<T> {
  constructor(
    private _getId: GetId<T>,
    private _getChildren: GetChildren<T>,
    private _getLeafNodeCount: GetLeafCount<T> = () => 0
  ) {}

  getTotalCounts(tree: T): Counts {
    return this._getCounts(tree, this._getLeafNodeCount);
  }

  getSelectedCounts(tree: T, model: Model): Counts {
    const setModel = Array.isArray(model) ? new Set(model) : model;
    return this._getCounts(tree, (leafNode: T): number =>
      setModel.has(this._getId(leafNode)) ? this._getLeafNodeCount(leafNode) : 0
    );
  }

  private _getCounts(tree: T, getLeafNodeCount: (item: T) => number): Counts {
    return getCounts(tree, this._getId, this._getChildren, getLeafNodeCount);
  }
}
