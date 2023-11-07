import {
  IdsArray,
  GetChildren,
  GetId,
  Ids,
  IdsSet,
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

  get array(): IdsArray {
    return toArray(this.states, this._ids);
  }

  get set(): IdsSet {
    return toSet(this.states, this._ids);
  }

  constructor(
    private _root: T,
    private _getId: GetId<T>,
    private _getChildren: GetChildren<T>,
    ids: Ids = []
  ) {
    this._ids = new IdsTree(this._root, this._getId, this._getChildren);
    this._states = this._toStates(ids);
  }

  updateOne(id: string): Transformer<T> {
    updateStates({
      states: this._states,
      tree: this._ids,
      targetId: id,
    });
    return this;
  }

  updateMultiple(ids: Ids): Transformer<T> {
    this._states = this._toStates(ids);
    return this;
  }

  private _toStates(ids: Ids): MutableStates {
    return toStates(ids, this._ids);
  }
}
