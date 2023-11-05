import { SetModel, States } from '../shared/types';
import { Ids } from './ids/ids';
import { toArray } from './to-array';

export function toSet<T>(states: States, ids: Ids<T>): SetModel {
  return new Set(toArray(states, ids));
}
