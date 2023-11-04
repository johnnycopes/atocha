export function tally(arr: readonly string[]): Record<string, number> {
  const map: Record<string, number> = {};

  for (const item of arr) {
    map[item] = (map[item] ?? 0) + 1;
  }

  return map;
}
