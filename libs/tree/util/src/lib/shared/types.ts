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

/**
 * A `readonly` record of the tree's partially or completely selected states.
 */
export type MutableStates = Record<string, State>;

/**
 * A readonly version of `MutableStates`.
 */
export type States = Readonly<MutableStates>;

/**
 * The state of an individual node. Unselected isn't represented as a state, but rather the absence of the node from the States record.
 */
export type State = 'checked' | 'indeterminate';

/**
 * The root node of the tree.
 */
export type Tree<T> = Readonly<T>;

/**
 * Callback function that retrieves the given node's unique ID.
 */
export type GetId<T> = (node: Tree<T>) => string;

/**
 * Callback function that retrieves the given node's children to recurse over.
 */
export type GetChildren<T> = (node: Tree<T>) => readonly Tree<T>[];

/**
 * Callback function that retrieves the given node's countable quantity.
 */
export type GetLeafCount<T> = (node: Tree<T>) => number;
