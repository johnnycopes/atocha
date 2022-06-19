export function recordToArray<T extends string | number | symbol>(record: Record<T, boolean>): string[] {
  return Object
    .entries<boolean>(record)
    .filter(([_key, checked]) => checked)
    .map(([key, _checked]) => key);
}
