import { IdsSet, ReadonlyStates } from '../shared/types';
import { IdsTree } from './ids/ids-tree';
import { toArray } from './to-array';

export function toSet<T>(states: ReadonlyStates, tree: IdsTree<T>): IdsSet {
  return new Set(toArray(states, tree));
}
