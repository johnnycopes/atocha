import { ReadonlyCollection, isReadonlyArray } from './collection';

/**
 * A `readonly` collection of selected node IDs.
 */
export type Ids = ReadonlyCollection<string>;

/**
 * A `readonly` array of selected node IDs.
 */
export type IdsArray = Extract<Ids, readonly string[]>;

/**
 * A `readonly` set of selected node IDs.
 */
export type IdsSet = Extract<Ids, ReadonlySet<string>>;

/**
 * Used to distinguish between array vs. set models.
 */
export function isIdsArray(ids: Ids): ids is IdsArray {
  return isReadonlyArray<string>(ids);
}
