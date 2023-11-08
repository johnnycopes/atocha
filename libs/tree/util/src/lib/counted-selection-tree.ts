import {
  Counts,
  GetChildren,
  GetId,
  GetLeafCount,
  Ids,
  MutableCounts,
  isIdsArray,
} from './shared/types';
import { getCounts } from './counted-selection-tree/get-counts';
import { ISelectionTree, SelectionTree } from './selection-tree';

export interface ICountedSelectionTree<T> extends ISelectionTree<T> {
  totalCounts: Counts;
  selectedCounts: Counts;
  updateCounts(ids: Ids): CountedSelectionTree<T>;
}

export class CountedSelectionTree<T>
  extends SelectionTree<T>
  implements ICountedSelectionTree<T>
{
  private _selectedCounts: Readonly<MutableCounts> = {};
  private readonly _totalCounts: Readonly<MutableCounts> = {};

  constructor(
    root: T,
    getId: GetId<T>,
    getChildren: GetChildren<T>,
    public getLeafCount: GetLeafCount<T>,
    ids: Ids = new Set<string>()
  ) {
    super(root, getId, getChildren, ids);
    this._totalCounts = this._getCounts(getLeafCount);
    this.updateCounts(ids);
  }

  get totalCounts(): Counts {
    return this._totalCounts;
  }

  get selectedCounts(): Counts {
    return this._selectedCounts;
  }

  updateCounts(ids: Ids): CountedSelectionTree<T> {
    const set = isIdsArray(ids) ? new Set(ids) : ids;
    this._selectedCounts = this._getCounts((leaf: T): number =>
      set.has(this.getId(leaf)) ? this.getLeafCount(leaf) : 0
    );
    return this;
  }

  private _getCounts(getLeafCount: GetLeafCount<T>): Counts {
    return getCounts(this.root, this.getId, this.getChildren, getLeafCount);
  }
}
