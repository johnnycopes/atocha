export type Model = ArrayModel | SetModel;
export type ArrayModel = readonly string[];
export type SetModel = ReadonlySet<string>;
export function isArrayModel(model: Model): model is ArrayModel {
  return Array.isArray(model);
}

export type MutableStates = Record<string, State>;
export type States = Readonly<MutableStates>;
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
