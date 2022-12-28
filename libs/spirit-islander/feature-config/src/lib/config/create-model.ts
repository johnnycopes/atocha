import { CheckboxState } from '@atocha/core/ui';
import { reduceRecursively } from '@atocha/core/util';
import { ConfigTree } from './create-tree';

export function createTreeModel<T>(
  tree: ConfigTree<T>,
  model: string[]
): Record<string, CheckboxState> {
  const state: Record<string, CheckboxState> = {};
  const childrenKeyedByParentId = reduceRecursively({
    item: tree,
    getItems: ({ children }) => children ?? [],
    initialValue: {} as Record<string, string[]>,
    reducer: (accum, item) => ({
      ...accum,
      [item.id]: item.children?.map(({ id }) => id) ?? [],
    }),
  });

  return Object.keys(childrenKeyedByParentId).reduce((accum, curr) => {
    if (model.includes(curr)) {
      accum[curr] = 'checked';
    } else if (childrenKeyedByParentId[curr].length > 0) {
      const childrenInModel = childrenKeyedByParentId[curr].reduce(
        (accum, child) => accum + (model.includes(child) ? 1 : 0),
        0
      );
      const totalChildren = childrenKeyedByParentId[curr].length;
      if (totalChildren === childrenInModel) {
        accum[curr] = 'checked';
      } else if (childrenInModel > 0) {
        accum[curr] = 'indeterminate';
      }
    }
    return accum;
  }, state);
}
