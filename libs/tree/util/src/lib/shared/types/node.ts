/**
 * Callback function that retrieves the given node's unique ID.
 */
export type GetId<T> = (node: T) => string;

/**
 * Callback function that retrieves the given node's children to recurse over.
 */
export type GetChildren<T> = (node: T) => readonly T[];

/**
 * Callback function that retrieves the given node's countable quantity.
 */
export type GetLeafCount<T> = (node: T) => number;
