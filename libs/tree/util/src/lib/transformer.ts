import {
  ArrayModel,
  GetChildren,
  GetId,
  Model,
  SetModel,
  MutableStates,
  States,
} from './shared/types';
import { IdsTree } from './transformer/ids/ids-tree';
import { toArray } from './transformer/to-array';
import { toSet } from './transformer/to-set';
import { toStates } from './transformer/to-states';
import { updateStates } from './transformer/update-states';

export class Transformer<T> {
  private readonly _ids: IdsTree<T>;
  private _states: MutableStates;

  get states(): States {
    return this._states;
  }

  get array(): ArrayModel {
    return toArray(this.states, this._ids);
  }

  get set(): SetModel {
    return toSet(this.states, this._ids);
  }

  constructor(
    private _root: T,
    private _getId: GetId<T>,
    private _getChildren: GetChildren<T>,
    private _initialValue: Model = []
  ) {
    this._ids = new IdsTree(this._root, this._getId, this._getChildren);
    this._states = this._toStates(this._initialValue);
  }

  updateOne(id: string): Transformer<T> {
    updateStates({
      states: this._states,
      tree: this._ids,
      targetId: id,
    });
    return this;
  }

  updateMultiple(ids: Model): Transformer<T> {
    this._states = this._toStates(ids);
    return this;
  }

  private _toStates(model: Model): MutableStates {
    return toStates(model, this._ids);
  }
}
