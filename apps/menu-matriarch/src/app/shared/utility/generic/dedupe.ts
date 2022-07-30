export function dedupe<T>(...arrays: T[][]): T[] {
  const allItems = [];
  for (const arr of arrays) {
    allItems.push(...arr);
  }
  return [...new Set(allItems)]
}
