import { ArrayModel, States } from '../shared/types';
import { Ids } from './ids/ids';

export function toArray<T>(states: States, ids: Ids<T>): ArrayModel {
  const model: string[] = [];

  for (const id of ids.descending) {
    if (states[id] === 'checked' && !ids.getChildrenIds(id).length) {
      model.push(id);
    }
  }

  return model;
}
