import { reduceRecursively } from '@atocha/core/util';
import { CheckboxState, CheckboxStates } from './checkbox-tree-new.component';

type ItemsRecord<T> = Record<string, { item: T; parentId: string | undefined }>;

export class ModelTransformer<T> {
  private _idsMap: Map<string, string[]>;
  private _ids: readonly string[];

  private _itemsKeyedById: ItemsRecord<T>;
  private _getParent: (item: T) => T[];

  constructor(
    private _tree: T,
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => T[]
  ) {
    this._idsMap = reduceRecursively({
      item: this._tree,
      getItems: this._getChildren,
      initialValue: new Map<string, string[]>(),
      reducer: (accum, curr) =>
        accum.set(
          this._getId(curr),
          this._getChildren(curr).length
            ? this._getChildren(curr).map((child) => this._getId(child))
            : []
        ),
    });

    // Reverse the keys because we want to ascend the tree starting from the leaf nodes
    this._ids = Array.from(this._idsMap.keys()).reverse();

    this._itemsKeyedById = this._createItemsRecord(this._tree);

    this._getParent = (item) => {
      const parentId = this._itemsKeyedById[this._getId(item)].parentId;
      return parentId ? [this._itemsKeyedById[parentId].item] : [];
    };
  }

  toModel(states: CheckboxStates): string[] {
    return this._ids.reduce((state, id) => {
      if (states[id] === 'checked' && !(this._idsMap.get(id) ?? []).length) {
        state.unshift(id);
      }
      return state;
    }, [] as string[]);
  }

  toStates(model: string[]): CheckboxStates {
    return this._ids.reduce((state, curr) => {
      if (model.includes(curr)) {
        state[curr] = 'checked';
      } else {
        const ids = this._idsMap.get(curr) ?? [];
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
    }, {} as CheckboxStates);
  }

  updateStates(
    checked: boolean,
    item: T,
    states: CheckboxStates
  ): CheckboxStates {
    let updatedStates = { ...states };
    updatedStates = this._updateItemAndDescendantStates({
      item,
      checked,
      states,
    });
    updatedStates = this._updateAncestorStates(item, updatedStates);
    return updatedStates;
  }

  private _updateItemAndDescendantStates({
    item,
    checked,
    states,
  }: {
    item: T;
    checked: boolean;
    states: CheckboxStates;
  }): CheckboxStates {
    const itemAndDescendantsIds = reduceRecursively({
      item,
      getItems: this._getChildren,
      initialValue: [] as string[],
      reducer: (accum, item) => [...accum, this._getId(item)],
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
    item: T,
    states: CheckboxStates
  ): CheckboxStates {
    const ancestors = reduceRecursively({
      item,
      getItems: this._getParent,
      initialValue: [] as T[],
      reducer: (accum, curr) =>
        this._getId(item) === this._getId(curr) ? [...accum] : [...accum, curr],
    });

    ancestors.forEach((ancestor) => {
      const ancestorId = this._getId(ancestor);
      const ancestorChildren = this._getChildren(ancestor);
      const ancestorChildrenStates: Record<CheckboxState, number> = {
        checked: 0,
        indeterminate: 0,
      };

      ancestorChildren.forEach((child) => {
        const childId = this._getId(child);
        const childState = states[childId];
        if (childState) {
          ancestorChildrenStates[childState]++;
        }
      });

      if (ancestorChildrenStates.checked === ancestorChildren.length) {
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

  private _createItemsRecord(item: T): ItemsRecord<T> {
    return reduceRecursively<T, ItemsRecord<T>>({
      item,
      getItems: this._getChildren,
      reducer: (accumulator, item, parent) => ({
        ...accumulator,
        [this._getId(item)]: {
          item,
          parentId: parent ? this._getId(parent) : undefined,
        },
      }),
      initialValue: {},
    });
  }
}
