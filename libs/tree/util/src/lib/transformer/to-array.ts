import { ArrayModel, States } from '../shared/types';
import { IdsTree } from './ids/ids-tree';

export function toArray<T>(states: States, ids: IdsTree<T>): ArrayModel {
  const model: string[] = [];

  for (const id of ids.descending) {
    if (states[id] === 'checked' && !ids.getChildrenIds(id).length) {
      model.push(id);
    }
  }

  return model;
}
