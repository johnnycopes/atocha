/**
 * A `readonly` record of the tree nodes' partially or completely selected states, keyed by node ID.
 */
export type MutableStates = Record<string, State>;

/**
 * A readonly version of `MutableStates`.
 */
export type ReadonlyStates = Readonly<MutableStates>;

/**
 * The state of an individual node. Unselected isn't represented as a state, but rather the absence of the node from the States record.
 */
export type State = 'checked' | 'indeterminate';
