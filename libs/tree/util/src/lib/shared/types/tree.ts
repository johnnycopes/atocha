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
