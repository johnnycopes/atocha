export function sort<TItem, TOutput>(
  items: TItem[],
  getProp: (item: TItem) => TOutput
): TItem[] {
  return items.sort((a, b) => getProp(a) > getProp(b) ? 1 : -1);
}
