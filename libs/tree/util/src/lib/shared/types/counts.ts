/**
 * A mutable record of all of a tree node's descendants, keyed by node ID.
 */
export type Counts = Record<string, number>;

/**
 * A readonly version of `MutableCounts`.
 */
export type ReadonlyCounts = Readonly<Counts>;
