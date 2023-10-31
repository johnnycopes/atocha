import { SelectionStates } from './types';
import { Ids } from './ids';
import { reduceRecursively } from '../reduce-recursively';

export function updateItemAndDescendantStates<T>({
  id,
  checked,
  states,
  ids,
}: {
  id: string;
  checked: boolean;
  states: SelectionStates;
  ids: Ids<T>;
}): SelectionStates {
  const itemAndDescendantsIds = reduceRecursively<string, string[]>({
    item: id,
    getItems: (id: string) => ids.map.get(id)?.childrenIds ?? [],
    initialValue: [],
    reducer: (accum, curr) => {
      accum.push(curr);
      return accum;
    },
  });

  itemAndDescendantsIds.forEach((id) => {
    if (checked) {
      states[id] = 'checked';
    } else {
      delete states[id];
    }
  });

  return states;
}
