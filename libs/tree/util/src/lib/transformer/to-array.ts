import { ArrayModel, States } from '../shared/types';
import { IdsTree } from './ids/ids-tree';

export function toArray<T>(states: States, tree: IdsTree<T>): ArrayModel {
  const model: string[] = [];

  for (const id of tree.descending) {
    if (states[id] === 'checked' && !tree.getChildrenIds(id).length) {
      model.push(id);
    }
  }

  return model;
}
