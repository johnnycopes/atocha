import { Counts, GetChildren, GetId, GetLeafCount, Ids } from './shared/types';
import { getCounts } from './counted-selection-tree/get-counts';
import { ISelectionTree, SelectionTree } from './selection-tree';

export interface ICountedSelectionTree<T> extends ISelectionTree<T> {
  getLeafCount: GetLeafCount<T>;
  getTotalCount(id: string): number;
  getSelectedCount(id: string): number;
  updateCounts(ids: Ids): CountedSelectionTree<T>;
}

export class CountedSelectionTree<T>
  extends SelectionTree<T>
  implements ICountedSelectionTree<T>
{
  private _selectedCounts: Readonly<Counts> = {};
  private readonly _totalCounts: Readonly<Counts> = {};

  constructor(
    root: T,
    getId: GetId<T>,
    getChildren: GetChildren<T>,
    readonly getLeafCount: GetLeafCount<T>,
    selectedIds: Ids = []
  ) {
    super(root, getId, getChildren, selectedIds);
    this._totalCounts = this._getCounts(getLeafCount);
    this.updateCounts(selectedIds);
  }

  getTotalCount(id: string): number {
    return this._totalCounts[id];
  }

  getSelectedCount(id: string): number {
    return this._selectedCounts[id];
  }

  updateCounts(ids: Ids): CountedSelectionTree<T> {
    const idsSet: ReadonlySet<string> = new Set(ids);
    this._selectedCounts = this._getCounts((leaf: T): number =>
      idsSet.has(this.getId(leaf)) ? this.getLeafCount(leaf) : 0
    );
    return this;
  }

  private _getCounts(getLeafCount: GetLeafCount<T>): Readonly<Counts> {
    return getCounts(this.root, this.getId, this.getChildren, getLeafCount);
  }
}
