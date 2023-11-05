import { ArrayModel, States } from '../shared/types';
import { Ids } from './ids/ids';
import { toSet } from './to-set';

export function toArray<T>(states: States, ids: Ids<T>): ArrayModel {
  return Array.from(toSet(states, ids));
}
