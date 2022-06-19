export function tally<T extends string | number | symbol>(arr: T[]): Record<T, number> {
  return arr.reduce((hashMap, item) => ({
    ...hashMap,
    [item]: hashMap[item] ? hashMap[item] + 1 : 1
  }), {} as Record<T, number>);
}
