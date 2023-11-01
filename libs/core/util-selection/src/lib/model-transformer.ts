import { Model, States } from './internal/types';
import { Ids } from './internal/ids';
import { toArray } from './internal/to-array';
import { toSet } from './internal/to-set';
import { toStates } from './internal/to-states';
import { updateStates } from './internal/update-states';

export class ModelTransformer<T> {
  private readonly _ids: Ids<T>;

  constructor(
    private _tree: T,
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => T[]
  ) {
    this._ids = new Ids(this._tree, this._getId, this._getChildren);
  }

  toArray(states: States): Extract<Model, string[]> {
    return toArray(states, this._ids);
  }

  toSet(states: States): Extract<Model, Set<string>> {
    return toSet(states, this._ids);
  }

  toStates(model: Model): States {
    return toStates(model, this._ids);
  }

  updateStates(checked: boolean, id: string, states: States): States {
    return updateStates(checked, id, states, this._ids);
  }
}
