import { reduceRecursively } from './reduce-recursively';
import { SelectionModel } from './model-transformer';

export type Counts = Record<string, number>;

export class Counter<T> {
  constructor(
    private _getId: (tree: T) => string,
    private _getChildren: (tree: T) => T[],
    private _getLeafNodeCount: (tree: T) => number = () => 0
  ) {}

  getTotalCounts(tree: T): Counts {
    return this._getCounts(tree, this._getLeafNodeCount);
  }

  getSelectedCounts(tree: T, model: SelectionModel): Counts {
    const setModel = Array.isArray(model) ? new Set(model) : model;
    return this._getCounts(tree, (leafNode: T): number =>
      setModel.has(this._getId(leafNode)) ? this._getLeafNodeCount(leafNode) : 0
    );
  }

  private _getCounts(tree: T, getLeafNodeCount: (item: T) => number): Counts {
    return reduceRecursively<T, Counts>({
      item: tree,
      getItems: this._getChildren,
      initialValue: {},
      reducer: (accum, curr) => {
        accum[this._getId(curr)] = reduceRecursively({
          item: curr,
          getItems: this._getChildren,
          initialValue: 0,
          reducer: (total, item) => total + getLeafNodeCount(item),
        });
        return accum;
      },
    });
  }
}
