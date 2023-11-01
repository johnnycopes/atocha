import { Ids } from './ids';
import { Model, States } from './types';

export function toArray<T>(
  states: States,
  ids: Ids<T>
): Extract<Model, string[]> {
  const model: string[] = [];

  for (const id of ids.descending) {
    if (states[id] === 'checked' && !ids.getChildrenIds(id).length) {
      model.push(id);
    }
  }

  return model;
}
