import { Ids } from './ids';
import { SelectionModel, SelectionStates } from './types';

export function toArray<T>(
  states: SelectionStates,
  ids: Ids<T>
): Extract<SelectionModel, string[]> {
  const model: string[] = [];

  for (const id of ids.descending) {
    if (
      states[id] === 'checked' &&
      (ids.map.get(id)?.childrenIds ?? []).length === 0
    ) {
      model.push(id);
    }
  }

  return model;
}
