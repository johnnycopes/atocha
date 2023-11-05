/**
 * A `readonly` record of the total counts of all a tree node's descendants, keyed by node ID.
 */
export type MutableCounts = Record<string, number>;

/**
 * A readonly version of `MutableCounts`.
 */
export type Counts = Readonly<MutableCounts>;
