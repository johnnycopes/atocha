import {
  Counts,
  GetChildren,
  GetId,
  GetLeafCount,
  Model,
  isArrayIds,
} from './shared/types';
import { getCounts } from './counter/get-counts';

export class Counter<T> {
  private _totalCounts: Counts = {};
  private _selectedCounts: Counts = {};

  get totalCounts(): Counts {
    return this._totalCounts;
  }

  get selectedCounts(): Counts {
    return this._selectedCounts;
  }

  constructor(
    private _root: T,
    private _getId: GetId<T>,
    private _getChildren: GetChildren<T>,
    private _getLeafCount: GetLeafCount<T>,
    model: Model = new Set<string>()
  ) {
    this._totalCounts = this._getCounts(this._getLeafCount);
    this.update(model);
  }

  update(model: Model): Counter<T> {
    const set = isArrayIds(model) ? new Set(model) : model;
    this._selectedCounts = this._getCounts((leaf: T): number =>
      set.has(this._getId(leaf)) ? this._getLeafCount(leaf) : 0
    );
    return this;
  }

  private _getCounts(getLeafCount: GetLeafCount<T>): Counts {
    return getCounts(this._root, this._getId, this._getChildren, getLeafCount);
  }
}
