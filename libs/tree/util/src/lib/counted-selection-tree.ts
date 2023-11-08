import {
  IdsArray,
  Counts,
  GetChildren,
  GetId,
  GetLeafCount,
  Ids,
  MutableCounts,
  IdsSet,
  States,
  isIdsArray,
} from './shared/types';
import { getCounts } from './countable-tree/get-counts';
import { ISelectionTree, SelectionTree } from './selection-tree';

export interface ICountedSelectionTree<T> extends ISelectionTree<T> {
  totalCounts: Counts;
  selectedCounts: Counts;
  updateCounts(ids: Ids): CountedSelectionTree<T>;
}

export class CountedSelectionTree<T> implements ICountedSelectionTree<T> {
  private _selectedCounts: Readonly<MutableCounts> = {};
  private readonly _totalCounts: Readonly<MutableCounts> = {};
  private readonly _tree: SelectionTree<T>;

  constructor(
    root: T,
    readonly getId: GetId<T>,
    readonly getChildren: GetChildren<T>,
    readonly getLeafCount: GetLeafCount<T>,
    ids: Ids = new Set<string>()
  ) {
    this._tree = new SelectionTree(root, getId, getChildren, ids);
    this._totalCounts = this._getCounts(getLeafCount);
    this.updateCounts(ids);
  }

  get root(): Readonly<T> {
    return this._tree.root;
  }

  get states(): States {
    return this._tree.states;
  }

  get array(): IdsArray {
    return this._tree.array;
  }

  get set(): IdsSet {
    return this._tree.set;
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
      set.has(this._tree.getId(leaf)) ? this.getLeafCount(leaf) : 0
    );
    return this;
  }

  updateOne(id: string): SelectionTree<T> {
    return this._tree.updateOne(id);
  }

  updateMultiple(ids: Ids): SelectionTree<T> {
    return this._tree.updateMultiple(ids);
  }

  private _getCounts(getLeafCount: GetLeafCount<T>): Counts {
    return getCounts(
      this._tree.root,
      this._tree.getId,
      this._tree.getChildren,
      getLeafCount
    );
  }
}
