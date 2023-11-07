import { ReadonlyCollection, isReadonlyArray } from './collection';

/**
 * A `readonly` collection of selected node IDs.
 */
export type Model = ReadonlyCollection<string>;

/**
 * A `readonly` array of selected node IDs.
 */
export type ArrayModel = Extract<ReadonlyCollection<string>, readonly string[]>;

/**
 * A `readonly` set of selected node IDs.
 */
export type SetModel = Extract<ReadonlyCollection<string>, ReadonlySet<string>>;

/**
 * Used to distinguish between array vs. set models.
 */
export function isArrayModel(model: Model): model is ArrayModel {
  return isReadonlyArray<string>(model);
}
