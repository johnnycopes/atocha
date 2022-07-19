export function areEqualShallow<K extends string | number | symbol, T>(a: Record<K, T>, b: Record<K, T>) {
  for (const key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }
  for (const key in b) {
    if (!(key in a)) {
      return false;
    }
  }
  return true;
}
