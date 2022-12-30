import { reduceRecursively } from '@atocha/core/util';
import { CheckboxState } from './checkbox-tree-new.component';

export class ModelTransformer<T> {
  private _idsMap = new Map<string, string[]>();
  private _ids: string[] = [];

  constructor(
    private _tree: T,
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => T[]
  ) {
    this.update(this._tree);
  }

  update(tree: T): void {
    this._idsMap = reduceRecursively({
      item: tree,
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
  }

  toObj(model: string[]): Record<string, CheckboxState> {
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
    }, {} as Record<string, CheckboxState>);
  }

  toArr(model: Record<string, CheckboxState>): string[] {
    return this._ids.reduce((state, id) => {
      if (model[id] === 'checked' && !(this._idsMap.get(id) ?? []).length) {
        state.unshift(id);
      }
      return state;
    }, [] as string[]);
  }
}
