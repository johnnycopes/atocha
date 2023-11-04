import { Model, States } from '../shared/types';
import { Ids } from './ids/ids';
import { toArray } from './to-array';

export function toSet<T>(
  states: States,
  ids: Ids<T>
): Extract<Model, Set<string>> {
  return new Set(toArray(states, ids));
}