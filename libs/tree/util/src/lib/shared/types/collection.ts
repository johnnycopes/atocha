export type Collection<T> = T[] | Set<T>;
export type ReadonlyCollection<T> = readonly T[] | ReadonlySet<T>;

export function isArray<T>(collection: Collection<T>): collection is T[] {
  return Array.isArray(collection);
}

export function isReadonlyArray<T>(
  collection: ReadonlyCollection<T>
): collection is readonly T[] {
  return Array.isArray(collection);
}
