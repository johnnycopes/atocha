import { SetModel, States } from '../shared/types';
import { IdsTree } from './ids/ids';
import { toArray } from './to-array';

export function toSet<T>(states: States, ids: IdsTree<T>): SetModel {
  return new Set(toArray(states, ids));
}
