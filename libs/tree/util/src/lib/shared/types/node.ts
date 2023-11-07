/**
 * A node in the tree.
 */
export type Node<T> = T;

/**
 * Callback function that retrieves the given node's unique ID.
 */
export type GetId<T> = (node: Node<T>) => string;

/**
 * Callback function that retrieves the given node's children to recurse over.
 */
export type GetChildren<T> = (node: Node<T>) => readonly Node<T>[];

/**
 * Callback function that retrieves the given node's countable quantity.
 */
export type GetLeafCount<T> = (node: Node<T>) => number;
