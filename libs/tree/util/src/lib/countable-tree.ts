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
import { getCounts } from './counter/get-counts';
import { ITree, Tree } from './tree';

export interface ICountableTree<T> extends ITree<T> {
  totalCounts: Counts;
  selectedCounts: Counts;
  updateCounts(ids: Ids): CountableTree<T>;
}

export class CountableTree<T> implements ICountableTree<T> {
  private _selectedCounts: Readonly<MutableCounts> = {};
  private readonly _totalCounts: Readonly<MutableCounts> = {};
  private readonly _tree: Tree<T>;

  constructor(
    root: T,
    readonly getId: GetId<T>,
    readonly getChildren: GetChildren<T>,
    readonly getLeafCount: GetLeafCount<T>,
    ids: Ids = new Set<string>()
  ) {
    this._tree = new Tree(root, getId, getChildren, ids);
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

  updateCounts(model: Ids): CountableTree<T> {
    const set = isIdsArray(model) ? new Set(model) : model;
    this._selectedCounts = this._getCounts((leaf: T): number =>
      set.has(this._tree.getId(leaf)) ? this.getLeafCount(leaf) : 0
    );
    return this;
  }

  updateOne(id: string): Tree<T> {
    return this._tree.updateOne(id);
  }

  updateMultiple(ids: Ids): Tree<T> {
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
