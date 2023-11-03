import { Tree } from './types';
import { GetChildren, GetId, GetLeafCount, Model } from './internal/types';
import { Counts, getCounts } from './internal/get-counts';

export class NewCounter<T> {
  totalCounts: Counts;

  get selectedCounts(): Counts {
    const setModel = Array.isArray(this._model)
      ? new Set(this._model)
      : this._model;
    return this._getCounts((leafNode: T): number =>
      setModel.has(this._getId(leafNode)) ? this._getLeafCount(leafNode) : 0
    );
  }

  constructor(
    private _tree: Tree<T>,
    private _getId: GetId<T>,
    private _getChildren: GetChildren<T>,
    private _getLeafCount: GetLeafCount<T>,
    private _model: Model = new Set<string>()
  ) {
    this.totalCounts = this._getCounts(this._getLeafCount);
  }

  updateModel(model: Model): NewCounter<T> {
    this._model = model;
    return this;
  }

  private _getCounts(getLeafCount: GetLeafCount<T>): Counts {
    return getCounts(this._tree, this._getId, this._getChildren, getLeafCount);
  }
}
