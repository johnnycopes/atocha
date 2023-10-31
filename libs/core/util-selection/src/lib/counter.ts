import { SelectionModel } from './internal/types';
import { Counts as CountsRecord, getCounts } from './internal/get-counts';

export type Counts = CountsRecord;

export class Counter<T> {
  constructor(
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => readonly T[],
    private _getLeafNodeCount: (tree: T) => number = () => 0
  ) {}

  getTotalCounts(tree: T): Counts {
    return this._getCounts(tree, this._getLeafNodeCount);
  }

  getSelectedCounts(tree: T, model: SelectionModel): Counts {
    const setModel = Array.isArray(model) ? new Set(model) : model;
    return this._getCounts(tree, (leafNode: T): number =>
      setModel.has(this._getId(leafNode)) ? this._getLeafNodeCount(leafNode) : 0
    );
  }

  private _getCounts(tree: T, getLeafNodeCount: (item: T) => number): Counts {
    return getCounts(tree, this._getId, this._getChildren, getLeafNodeCount);
  }
}
