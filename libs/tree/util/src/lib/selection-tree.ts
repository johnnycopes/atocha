import { GetChildren, GetId, Ids, States, State } from './shared/types';
import { IdsTree } from './selection-tree/ids/ids-tree';
import { toIds } from './selection-tree/to-ids';
import { toStates } from './selection-tree/to-states';
import { updateStates } from './selection-tree/update-states';
import { ITree, Tree } from './tree';

export interface ISelectionTree<T> extends ITree<T> {
  selectedIds: Ids;
  getState(id: string): State | undefined;
  updateOne(id: string): SelectionTree<T>;
  updateMultiple(ids: Ids): SelectionTree<T>;
}

export class SelectionTree<T> extends Tree<T> implements ISelectionTree<T> {
  private _states: States;
  private readonly _tree: IdsTree<T>;

  constructor(
    root: T,
    getId: GetId<T>,
    getChildren: GetChildren<T>,
    selectedIds: Ids = []
  ) {
    super(root, getId, getChildren);
    this._tree = new IdsTree(root, getId, getChildren);
    this._states = this._toStates(selectedIds);
  }

  get selectedIds(): Ids {
    return toIds(this._states, this._tree);
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

  private _toStates(ids: Ids): States {
    return toStates(ids, this._tree);
  }
}
