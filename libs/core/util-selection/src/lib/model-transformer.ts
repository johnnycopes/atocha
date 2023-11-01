import { Model, States } from './internal/types';
import { Ids } from './internal/ids';
import { toArray } from './internal/to-array';
import { toSet } from './internal/to-set';
import { toStates } from './internal/to-states';
import { updateStates } from './internal/update-states';

export class ModelTransformer<T> {
  private readonly _ids: Ids<T>;
  private _states: States;

  get states(): States {
    return { ...this._states };
  }

  get array(): Extract<Model, string[]> {
    return toArray(this._states, this._ids);
  }

  get set(): Extract<Model, Set<string>> {
    return toSet(this._states, this._ids);
  }

  constructor(
    private _tree: T,
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => T[],
    private _initialValue: Model = []
  ) {
    this._ids = new Ids(this._tree, this._getId, this._getChildren);
    this._states = this._toStates(this._initialValue);
  }

  updateStates(checked: boolean, id: string): ModelTransformer<T> {
    updateStates(checked, id, this._states, this._ids);
    return this;
  }

  updateModel(value: Model): ModelTransformer<T> {
    this._states = this._toStates(value);
    return this;
  }

  private _toStates(model: Model): States {
    return toStates(model, this._ids);
  }
}
