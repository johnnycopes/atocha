import { Ids } from './ids';
import { SelectionModel, SelectionStates } from './types';

export function toArray<T>(
  states: SelectionStates,
  ids: Ids<T>
): Extract<SelectionModel, string[]> {
  const model: string[] = [];

  for (const id of ids.descending) {
    if (states[id] === 'checked' && !ids.getChildrenIds(id).length) {
      model.push(id);
    }
  }

  return model;
}
