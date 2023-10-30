import { reduceRecursively } from '../reduce-recursively';
import { Ids, IdsMap } from './ids';
import { toArray } from './to-array';
import { toSet } from './to-set';
import { toStates } from './to-states';

export type SelectionModel = string[] | Set<string>;
export type SelectionState = 'checked' | 'indeterminate';
export type SelectionStates = Record<string, SelectionState>;

export class ModelTransformer<T> {
  private readonly _ids: Ids<T>;
  private readonly _idsMap: IdsMap;
  private readonly _idsArr: readonly string[];

  constructor(
    private _tree: T,
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => T[]
  ) {
    this._ids = new Ids(this._tree, this._getId, this._getChildren);
    this._idsMap = this._ids.map;
    this._idsArr = this._ids.descending;
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
    let updatedStates = this._updateItemAndDescendantStates({
      id,
      checked,
      states,
    });
    updatedStates = this._updateAncestorStates(id, updatedStates);
    return updatedStates;
  }

  private _updateItemAndDescendantStates({
    id,
    checked,
    states,
  }: {
    id: string;
    checked: boolean;
    states: SelectionStates;
  }): SelectionStates {
    const itemAndDescendantsIds = reduceRecursively<string, string[]>({
      item: id,
      getItems: (id: string) => this._idsMap.get(id)?.childrenIds ?? [],
      initialValue: [],
      reducer: (accum, curr) => {
        accum.push(curr);
        return accum;
      },
    });

    itemAndDescendantsIds.forEach((id) => {
      if (checked) {
        states[id] = 'checked';
      } else {
        delete states[id];
      }
    });

    return states;
  }

  private _updateAncestorStates(
    id: string,
    states: SelectionStates
  ): SelectionStates {
    const ancestorIds = reduceRecursively<string, string[]>({
      item: id,
      getItems: (id) => {
        const parentId = this._idsMap.get(id)?.parentId;
        return parentId ? [parentId] : [];
      },
      initialValue: [],
      reducer: (accum, curr) => {
        if (id === curr) return accum;
        accum.push(curr);
        return accum;
      },
    });

    ancestorIds.forEach((ancestorId) => {
      const ancestorChildrenIds =
        this._idsMap.get(ancestorId)?.childrenIds ?? [];
      const ancestorChildrenStates: Record<SelectionState, number> = {
        checked: 0,
        indeterminate: 0,
      };

      ancestorChildrenIds.forEach((childId) => {
        const childState = states[childId];
        if (states[childId]) {
          ancestorChildrenStates[childState]++;
        }
      });

      if (ancestorChildrenStates.checked === ancestorChildrenIds.length) {
        states[ancestorId] = 'checked';
      } else if (
        ancestorChildrenStates.checked > 0 ||
        ancestorChildrenStates.indeterminate > 0
      ) {
        states[ancestorId] = 'indeterminate';
      } else {
        delete states[ancestorId];
      }
    });

    return states;
  }
}
