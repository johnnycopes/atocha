import {
  IdsArray,
  GetChildren,
  GetId,
  Ids,
  MutableStates,
  IdsSet,
  States,
} from './shared/types';
import { IdsTree } from './selection-tree/ids/ids-tree';
import { toArray } from './selection-tree/to-array';
import { toSet } from './selection-tree/to-set';
import { toStates } from './selection-tree/to-states';
import { updateStates } from './selection-tree/update-states';
import { ITree } from './tree';

export interface ISelectionTree<T> extends ITree<T> {
  states: States;
  array: IdsArray;
  set: IdsSet;
  updateOne(id: string): SelectionTree<T>;
  updateMultiple(ids: Ids): SelectionTree<T>;
}

export class SelectionTree<T> implements ISelectionTree<T> {
  private _states: MutableStates;
  private readonly _tree: IdsTree<T>;

  constructor(
    private _root: T,
    readonly getId: GetId<T>,
    readonly getChildren: GetChildren<T>,
    ids: Ids = []
  ) {
    this._tree = new IdsTree(this._root, this.getId, this.getChildren);
    this._states = this._toStates(ids);
  }

  get root(): Readonly<T> {
    return this._root;
  }

  get states(): States {
    return this._states;
  }

  get array(): IdsArray {
    return toArray(this.states, this._tree);
  }

  get set(): IdsSet {
    return toSet(this.states, this._tree);
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
