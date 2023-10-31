import { SelectionModel, SelectionStates } from './types';
import { Ids } from './ids';
import { toArray } from './to-array';
import { toSet } from './to-set';
import { toStates } from './to-states';
import { updateStates } from './update-states';

export class ModelTransformer<T> {
  private readonly _ids: Ids<T>;

  constructor(
    private _tree: T,
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => T[]
  ) {
    this._ids = new Ids(this._tree, this._getId, this._getChildren);
  }

  toArray(states: SelectionStates): Extract<SelectionModel, string[]> {
    return toArray(states, this._ids);
  }

  toSet(states: SelectionStates): Extract<SelectionModel, Set<string>> {
    return toSet(states, this._ids);
  }

  toStates(model: SelectionModel): SelectionStates {
    return toStates(model, this._ids);
  }

  updateStates(
    checked: boolean,
    id: string,
    states: SelectionStates
  ): SelectionStates {
    return updateStates(checked, id, states, this._ids);
  }
}
