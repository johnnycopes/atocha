import { Ids } from './ids';
import { SelectionModel, SelectionStates } from './model-transformer';
import { toArray } from './to-array';

export function toSet<T>(
  states: SelectionStates,
  ids: Ids<T>
): Extract<SelectionModel, Set<string>> {
  return new Set(toArray(states, ids));
}
