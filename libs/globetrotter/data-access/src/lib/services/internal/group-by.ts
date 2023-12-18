export function groupBy<T extends object>(
  collection: T[],
  key: keyof T
): Record<string, T[]> {
  const record: Record<string, T[]> = {};

  for (const item of collection) {
    const result = item[key];
    if (typeof result !== 'string') {
      throw new Error('Key must be associated with value of type string');
    }

    if (!(result in record)) record[result] = [];
    record[result].push(item);
  }

  return record;
}
