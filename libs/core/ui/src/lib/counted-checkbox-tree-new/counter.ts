// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { reduce } from 'lodash';

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

  getSelectedCounts(model: string[], tree: T): Counts {
    const leafNodeCount = (leafItem: T): number => {
      const leafItemId = this._getId(leafItem);
      return model.includes(leafItemId) ? this._getLeafNodeCount(leafItem) : 0;
    };
    return this._getCounts(tree, leafNodeCount);
  }

  private _getCounts(tree: T, getLeafItemCount: (item: T) => number): Counts {
    const id = this._getId(tree);
    const children = this._getChildren(tree);
    if (!children.length) {
      const count = getLeafItemCount(tree);
      return { [id]: count };
    }
    const descendantTotals = children.reduce(
      (totalsDict, child) =>
        Object.assign(totalsDict, this._getCounts(child, getLeafItemCount)),
      {} as Counts
    );
    const grandTotal = reduce(
      children,
      (total, child) => {
        const childId = this._getId(child);
        const childTotal = descendantTotals[childId];
        return total + childTotal;
      },
      0
    );
    return {
      ...descendantTotals,
      [id]: grandTotal,
    };
  }
}
