import { reduceRecursively } from '@atocha/core/util';

export type SelectionState = 'checked' | 'indeterminate';
export type SelectionStates = Record<string, SelectionState>;

type IdsMap = Map<
  string,
  { parentId: string | undefined; childrenIds: string[] }
>;

export class ModelTransformer<T> {
  private _idsMap: IdsMap;
  private _ids: readonly string[];

  constructor(
    private _tree: T,
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => T[]
  ) {
    this._idsMap = reduceRecursively<T, IdsMap>({
      item: this._tree,
      getItems: this._getChildren,
      initialValue: new Map(),
      reducer: (accum, item, parent) =>
        accum.set(this._getId(item), {
          parentId: parent ? this._getId(parent) : undefined,
          childrenIds: this._getChildren(item).length
            ? this._getChildren(item).map((child) => this._getId(child))
            : [],
        }),
    });

    // Reverse the keys because we want to ascend the tree starting from the leaf nodes
    this._ids = Array.from(this._idsMap.keys()).reverse();
  }

  toModel(states: SelectionStates): string[] {
    const model: string[] = [];

    for (const id of this._ids) {
      const hasNoChildren =
        (this._idsMap.get(id)?.childrenIds ?? []).length === 0;
      if (states[id] === 'checked' && hasNoChildren) {
        model.push(id);
      }
    }

    return model.reverse();
  }

  toStates(model: string[]): SelectionStates {
    const states: SelectionStates = {};

    for (const id of this._ids) {
      if (model.includes(id)) {
        states[id] = 'checked';
      } else {
        const ids = this._idsMap.get(id)?.childrenIds ?? [];
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
