import {
  IdsArray,
  GetChildren,
  GetId,
  Ids,
  MutableStates,
  IdsSet,
  States,
} from './shared/types';
import { IdsTree } from './transformer/ids/ids-tree';
import { toArray } from './transformer/to-array';
import { toSet } from './transformer/to-set';
import { toStates } from './transformer/to-states';
import { updateStates } from './transformer/update-states';

export interface ITree<T> {
  root: Readonly<T>;
  getId: GetId<T>;
  getChildren: GetChildren<T>;
  states: States;
  array: IdsArray;
  set: IdsSet;
  updateOne(id: string): Tree<T>;
  updateMultiple(ids: Ids): Tree<T>;
}

export class Tree<T> implements ITree<T> {
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

  updateOne(id: string): Tree<T> {
    updateStates({
      states: this._states,
      tree: this._tree,
      targetId: id,
    });
    return this;
  }

  updateMultiple(ids: Ids): Tree<T> {
    this._states = this._toStates(ids);
    return this;
  }

  private _toStates(model: Ids): MutableStates {
    return toStates(model, this._tree);
  }
}