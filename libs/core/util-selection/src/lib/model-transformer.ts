import { reduceRecursively } from './reduce-recursively';

export type SelectionModel = string[] | Set<string>;
export type SelectionState = 'checked' | 'indeterminate';
export type SelectionStates = Record<string, SelectionState>;

type IdsMap = Map<
  string,
  { parentId: string | undefined; childrenIds: string[] }
>;

export class ModelTransformer<T> {
  private readonly _idsMap: IdsMap;
  private readonly _ids: readonly string[];

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

    this._ids = Array.from(this._idsMap.keys());
  }

  toArray(states: SelectionStates): Extract<SelectionModel, string[]> {
    const model: string[] = [];

    for (const id of this._ids) {
      if (
        states[id] === 'checked' &&
        (this._idsMap.get(id)?.childrenIds ?? []).length === 0
      ) {
        model.push(id);
      }
    }

    return model;
  }

  toSet(states: SelectionStates): Extract<SelectionModel, Set<string>> {
    return new Set(this.toArray(states));
  }

  toStates(model: SelectionModel): SelectionStates {
    const states: SelectionStates = {};
    const idsModel = Array.isArray(model) ? new Set(model) : model;

    /*
      Iterating through the IDs backwards builds up `states` from the leaf nodes
      of the tree up towards the root. The code is procedural and highly depends
      on this order but is more performant since each node reliably knows the state
      of all of its children.
    */
    for (let i = this._ids.length - 1; i >= 0; i--) {
      const id = this._ids[i];
      if (idsModel.has(id)) {
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
