import { CheckboxState } from '@atocha/core/ui';
import { reduceRecursively } from '@atocha/core/util';
import { ConfigTree } from './create-tree';

export function transformArrToObj<T>(
  tree: ConfigTree<T>,
  model: string[]
): Record<string, CheckboxState> {
  const childrenIds = reduceRecursively({
    item: tree,
    getItems: ({ children }) => children ?? [],
    initialValue: new Map<string, string[]>(),
    reducer: (accum, item) =>
      accum.set(item.id, item.children?.map(({ id }) => id) ?? []),
  });

  return Array.from(childrenIds.keys())
    .reverse() // Reverse the keys because we want to ascend the tree starting from the leaf nodes
    .reduce((state, curr) => {
      if (model.includes(curr)) {
        state[curr] = 'checked';
      } else {
        const ids = childrenIds.get(curr) ?? [];
        if (ids.length) {
          const idsInState = ids.reduce(
            (total, id) => total + (state[id] ? 1 : 0),
            0
          );
          const totalIds = ids.length;

          if (totalIds === idsInState) {
            state[curr] = 'checked';
          } else if (idsInState > 0) {
            state[curr] = 'indeterminate';
          }
        }
      }
      return state;
    }, {} as Record<string, CheckboxState>);
}

export function transformObjToArr<T>(
  tree: ConfigTree<T>,
  model: Record<string, CheckboxState>
): string[] {
  const childrenIds = reduceRecursively({
    item: tree,
    getItems: ({ children }) => children ?? [],
    initialValue: new Map<string, string[]>(),
    reducer: (accum, item) =>
      accum.set(item.id, item.children?.map(({ id }) => id) ?? []),
  });

  return Array.from(childrenIds.keys())
    .reverse()
    .reduce((state, id) => {
      if (model[id] === 'checked' && !(childrenIds.get(id) ?? []).length) {
        state.unshift(id);
      }
      return state;
    }, [] as string[]);
}
