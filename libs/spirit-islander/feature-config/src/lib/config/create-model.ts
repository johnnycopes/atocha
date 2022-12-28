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
    initialValue: new Map<string, string[]>(),
    reducer: (accum, item) =>
      accum.set(item.id, item.children?.map(({ id }) => id) ?? []),
  });

  return Array.from(childrenKeyedByParentId.keys()).reduce((accum, curr) => {
    if (model.includes(curr)) {
      accum[curr] = 'checked';
    } else {
      const parentChildren = childrenKeyedByParentId.get(curr) ?? [];
      if (parentChildren.length) {
        const childrenInModel = parentChildren.reduce(
          (accum, child) => accum + (model.includes(child) ? 1 : 0),
          0
        );
        const totalChildren = parentChildren.length;

        if (totalChildren === childrenInModel) {
          accum[curr] = 'checked';
        } else if (childrenInModel > 0) {
          accum[curr] = 'indeterminate';
        }
      }
    }
    return accum;
  }, state);
}
