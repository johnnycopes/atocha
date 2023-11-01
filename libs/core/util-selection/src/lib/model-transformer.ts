import { Model, States } from './internal/types';
import { Ids } from './internal/ids';
import { toArray } from './internal/to-array';
import { toSet } from './internal/to-set';
import { toStates } from './internal/to-states';
import { updateStates } from './internal/update-states';

export class ModelTransformer<T> {
  private readonly _ids: Ids<T>;
  private _states: States;

  constructor(
    private _tree: T,
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => T[],
    private _initialValue: Model = []
  ) {
    this._ids = new Ids(this._tree, this._getId, this._getChildren);
    this._states = toStates(this._initialValue, this._ids);
  }

  toArray(): Extract<Model, string[]> {
    return toArray(this._states, this._ids);
  }

  toSet(): Extract<Model, Set<string>> {
    return toSet(this._states, this._ids);
  }

  toStates(): States {
    return { ...this._states };
  }

  updateStates(checked: boolean, id: string): ModelTransformer<T> {
    updateStates(checked, id, this._states, this._ids);
    return this;
  }
}
