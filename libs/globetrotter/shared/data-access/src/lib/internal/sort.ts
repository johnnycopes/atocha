export function sort<TItem, TOutput>(
  items: readonly TItem[],
  getProp: (item: TItem) => TOutput
): TItem[] {
  return items.slice().sort((a, b) => (getProp(a) > getProp(b) ? 1 : -1));
}
