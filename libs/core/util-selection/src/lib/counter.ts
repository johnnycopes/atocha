import { Tree } from './internal/types';
import { GetChildren, GetId, GetLeafCount, Model } from './internal/types';
import { Counts, getCounts } from './internal/get-counts';

export class NewCounter<T> {
  private _totalCounts: Counts = {};
  private _selectedCounts: Counts = {};

  get totalCounts(): Counts {
    return { ...this._totalCounts };
  }

  get selectedCounts(): Counts {
    return { ...this._selectedCounts };
  }

  constructor(
    private _tree: Tree<T>,
    private _getId: GetId<T>,
    private _getChildren: GetChildren<T>,
    private _getLeafCount: GetLeafCount<T>,
    model: Model = new Set<string>()
  ) {
    this._totalCounts = this._getCounts(this._getLeafCount);
    this.update(model);
  }

  update(model: Model): NewCounter<T> {
    const set = Array.isArray(model) ? new Set(model) : model;
    this._selectedCounts = this._getCounts((leafNode: T): number =>
      set.has(this._getId(leafNode)) ? this._getLeafCount(leafNode) : 0
    );
    return this;
  }

  private _getCounts(getLeafCount: GetLeafCount<T>): Counts {
    return getCounts(this._tree, this._getId, this._getChildren, getLeafCount);
  }
}
