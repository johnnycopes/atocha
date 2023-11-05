import { SetModel, States } from '../shared/types';
import { Ids } from './ids/ids';

export function toSet<T>(states: States, ids: Ids<T>): SetModel {
  const set = new Set<string>();

  for (const id of ids.descending) {
    if (states[id] === 'checked' && !ids.getChildrenIds(id).length) {
      set.add(id);
    }
  }

  return set;
}
