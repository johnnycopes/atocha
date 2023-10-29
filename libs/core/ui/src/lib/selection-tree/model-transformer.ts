import { reduceRecursively } from '@atocha/core/util';

export type SelectionState = 'checked' | 'indeterminate';
export type SelectionStates = Record<string, SelectionState>;

type IdsRecord = Record<
  string,
  { parentId: string | undefined; childrenIds: string[] }
>;

export class ModelTransformer<T> {
  private readonly _idsRecord: IdsRecord;
  private readonly _ids: readonly string[];

  constructor(
    private _tree: T,
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => T[]
  ) {
    this._idsRecord = reduceRecursively<T, IdsRecord>({
      item: this._tree,
      getItems: this._getChildren,
      initialValue: {},
      reducer: (accum, item, parent) => {
        accum[this._getId(item)] = {
          parentId: parent ? this._getId(parent) : undefined,
          childrenIds: this._getChildren(item).map((child) =>
            this._getId(child)
          ),
        };
        return accum;
      },
    });

    this._ids = Object.keys(this._idsRecord);
  }

  toModel(states: SelectionStates): string[] {
    const model: string[] = [];

    for (const id of this._ids) {
      if (states[id] === 'checked' && !this._idsRecord[id].childrenIds.length) {
        model.push(id);
      }
    }

    return model;
  }

  toStates(model: string[] | Set<string>): SelectionStates {
    const states: SelectionStates = {};
    const idsModel = Array.isArray(model) ? new Set(model) : model;

    // Iterating through the IDs backwards is equivalent to traversing the tree from the leaf nodes upward
    for (let i = this._ids.length - 1; i >= 0; i--) {
      const id = this._ids[i];
      if (idsModel.has(id)) {
        states[id] = 'checked';
      } else {
        const ids = this._idsRecord[id].childrenIds;
        if (ids.length) {
          const idsInState = ids.reduce(
            (total, id) => total + (states[id] ? 1 : 0),
            0
          );
          const totalIds = ids.length;

          if (totalIds === 1 && states[ids[0]] === 'indeterminate') {
            states[id] = 'indeterminate';
          } else if (totalIds === idsInState) {
            states[id] = 'checked';
          } else if (idsInState > 0) {
            states[id] = 'indeterminate';
          }
        }
      }
    }

    return states;
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
      getItems: (id: string) => this._idsRecord[id].childrenIds,
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
        const parentId = this._idsRecord[id].parentId;
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
      const ancestorChildrenIds = this._idsRecord[ancestorId].childrenIds;
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
