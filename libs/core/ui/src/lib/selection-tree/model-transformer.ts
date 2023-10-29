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
    this._idsMap = reduceRecursively({
      item: this._tree,
      getItems: this._getChildren,
      initialValue: new Map() as IdsMap,
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
    return this._ids.reduce((state, id) => {
      if (
        states[id] === 'checked' &&
        !(this._idsMap.get(id)?.childrenIds ?? []).length
      ) {
        state.unshift(id);
      }
      return state;
    }, [] as string[]);
  }

  toStates(model: string[]): SelectionStates {
    return this._ids.reduce((state, curr) => {
      if (model.includes(curr)) {
        state[curr] = 'checked';
      } else {
        const ids = this._idsMap.get(curr)?.childrenIds ?? [];
        if (ids.length) {
          const idsInState = ids.reduce(
            (total, id) => total + (state[id] ? 1 : 0),
            0
          );
          const totalIds = ids.length;

          if (totalIds === 1 && state[ids[0]] === 'indeterminate') {
            state[curr] = 'indeterminate';
          } else if (totalIds === idsInState) {
            state[curr] = 'checked';
          } else if (idsInState > 0) {
            state[curr] = 'indeterminate';
          }
        }
      }
      return state;
    }, {} as SelectionStates);
  }

  updateStates(
    checked: boolean,
    id: string,
    states: SelectionStates
  ): SelectionStates {
    let updatedStates = { ...states };
    updatedStates = this._updateItemAndDescendantStates({
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
    const itemAndDescendantsIds = reduceRecursively({
      item: id,
      getItems: (id: string) => this._idsMap.get(id)?.childrenIds ?? [],
      initialValue: [] as string[],
      reducer: (accum, curr) => [...accum, curr],
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
    const ancestorIds = reduceRecursively({
      item: id,
      getItems: (id) => {
        const parentId = this._idsMap.get(id)?.parentId;
        return parentId ? [parentId] : [];
      },
      initialValue: [] as string[],
      reducer: (accum, curr) => (id === curr ? [...accum] : [...accum, curr]),
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
