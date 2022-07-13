export function getItemsRecursively<T>(
  item: T,
  getItems: (item: T) => T[]
): T[] {
  const items = getItems(item);

  if (!items?.length) {
    return [item];
  } else {
    return [
      item,
      ...items.flatMap((child) => getItemsRecursively(child, getItems)),
    ];
  }
}
