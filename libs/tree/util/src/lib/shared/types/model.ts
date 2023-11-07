import { ReadonlyCollection, isReadonlyArray } from './collection';

/**
 * A `readonly` collection of selected node IDs.
 */
export type Model = ReadonlyCollection<string>;

/**
 * A `readonly` array of selected node IDs.
 */
export type ArrayIds = Extract<ReadonlyCollection<string>, readonly string[]>;

/**
 * A `readonly` set of selected node IDs.
 */
export type SetIds = Extract<ReadonlyCollection<string>, ReadonlySet<string>>;

/**
 * Used to distinguish between array vs. set models.
 */
export function isArrayIds(ids: Model): ids is ArrayIds {
  return isReadonlyArray<string>(ids);
}
