import { Ids, ReadonlyStates } from '../shared/types';
import { IdsTree } from './ids/ids-tree';

export function toArray<T>(states: ReadonlyStates, tree: IdsTree<T>): Ids {
  const ids: string[] = [];

  for (const id of tree.descendingIds) {
    if (states[id] === 'checked' && !tree.getChildrenIds(id).length) {
      ids.push(id);
    }
  }

  return ids;
}
