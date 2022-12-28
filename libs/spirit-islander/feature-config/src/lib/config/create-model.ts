import { CheckboxState } from '@atocha/core/ui';
import { reduceRecursively } from '@atocha/core/util';
import { ConfigTree } from './create-tree';

export function createModel<T>(
  tree: ConfigTree<T>,
  model: string[]
): Record<string, CheckboxState> {
  const state: Record<string, CheckboxState> = {};

  const childrenIds = reduceRecursively({
    item: tree,
    getItems: ({ children }) => children ?? [],
    initialValue: new Map<string, string[]>(),
    reducer: (accum, item) =>
      accum.set(item.id, item.children?.map(({ id }) => id) ?? []),
  });

  return Array.from(childrenIds.keys())
    .reverse() // Reverse the keys because we want to ascend the tree starting from the leaf nodes
    .reduce((accum, curr) => {
      if (model.includes(curr)) {
        accum[curr] = 'checked';
      } else {
        const ids = childrenIds.get(curr) ?? [];
        if (ids.length) {
          const idsInState = ids.reduce(
            (accum, id) => accum + (state[id] ? 1 : 0),
            0
          );
          const totalIds = ids.length;

          if (totalIds === idsInState) {
            accum[curr] = 'checked';
          } else if (idsInState > 0) {
            accum[curr] = 'indeterminate';
          }
        }
      }
      return accum;
    }, state);
}
