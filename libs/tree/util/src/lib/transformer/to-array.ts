import { ArrayIds, States } from '../shared/types';
import { IdsTree } from './ids/ids-tree';

export function toArray<T>(states: States, tree: IdsTree<T>): ArrayIds {
  const model: string[] = [];

  for (const id of tree.descendingIds) {
    if (states[id] === 'checked' && !tree.getChildrenIds(id).length) {
      model.push(id);
    }
  }

  return model;
}
