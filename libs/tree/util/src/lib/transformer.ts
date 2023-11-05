import {
  ArrayModel,
  GetChildren,
  GetId,
  Model,
  SetModel,
  States,
  Tree,
} from './shared/types';
import { Ids } from './transformer/ids/ids';
import { toArray } from './transformer/to-array';
import { toSet } from './transformer/to-set';
import { toStates } from './transformer/to-states';
import { updateStates } from './transformer/update-states';

export class Transformer<T> {
  private readonly _ids: Ids<T>;
  private _states: States;

  get states(): Readonly<States> {
    return this._states;
  }

  get array(): ArrayModel {
    return toArray(this._states, this._ids);
  }

  get set(): SetModel {
    return toSet(this._states, this._ids);
  }

  constructor(
    private _tree: Tree<T>,
    private _getId: GetId<T>,
    private _getChildren: GetChildren<T>,
    private _initialValue: Model = []
  ) {
    this._ids = new Ids(this._tree, this._getId, this._getChildren);
    this._states = this._toStates(this._initialValue);
  }

  updateOne(id: string): Transformer<T> {
    updateStates({
      states: this._states,
      ids: this._ids,
      targetId: id,
    });
    return this;
  }

  updateMultiple(ids: Model): Transformer<T> {
    this._states = this._toStates(ids);
    return this;
  }

  private _toStates(model: Model): States {
    return toStates(model, this._ids);
  }
}
