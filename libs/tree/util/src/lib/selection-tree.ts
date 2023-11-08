import {
  IdsArray,
  GetChildren,
  GetId,
  Ids,
  MutableStates,
  IdsSet,
  State,
} from './shared/types';
import { IdsTree } from './selection-tree/ids/ids-tree';
import { toArray } from './selection-tree/to-array';
import { toSet } from './selection-tree/to-set';
import { toStates } from './selection-tree/to-states';
import { updateStates } from './selection-tree/update-states';
import { ITree, Tree } from './tree';

export interface ISelectionTree<T> extends ITree<T> {
  array: IdsArray;
  set: IdsSet;
  getState(id: string): State | undefined;
  updateOne(id: string): SelectionTree<T>;
  updateMultiple(ids: Ids): SelectionTree<T>;
}

export class SelectionTree<T> extends Tree<T> implements ISelectionTree<T> {
  private _states: MutableStates;
  private readonly _tree: IdsTree<T>;

  constructor(
    root: T,
    getId: GetId<T>,
    getChildren: GetChildren<T>,
    ids: Ids = []
  ) {
    super(root, getId, getChildren);
    this._tree = new IdsTree(root, getId, getChildren);
    this._states = this._toStates(ids);
  }

  get array(): IdsArray {
    return toArray(this._states, this._tree);
  }

  get set(): IdsSet {
    return toSet(this._states, this._tree);
  }

  getState(id: string): State | undefined {
    return this._states[id];
  }

  updateOne(id: string): SelectionTree<T> {
    updateStates({
      states: this._states,
      tree: this._tree,
      targetId: id,
    });
    return this;
  }

  updateMultiple(ids: Ids): SelectionTree<T> {
    this._states = this._toStates(ids);
    return this;
  }

  private _toStates(ids: Ids): MutableStates {
    return toStates(ids, this._tree);
  }
}
