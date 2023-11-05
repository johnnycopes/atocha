/**
 * A `readonly` collection of selected node IDs.
 */
export type Model = ArrayModel | SetModel;

/**
 * A `readonly` array of selected node IDs.
 */
export type ArrayModel = readonly string[];

/**
 * A `readonly` set of selected node IDs.
 */
export type SetModel = ReadonlySet<string>;

/**
 * Used to distinguish between array vs. set models.
 */
export function isArrayModel(model: Model): model is ArrayModel {
  return Array.isArray(model);
}
