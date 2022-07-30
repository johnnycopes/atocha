export function flattenValues<T>(obj: { [key: string]: T[] }): T[] {
  return Object
    .values(obj)
    .reduce((allItems, currItems) => ([...allItems, ...currItems]), [])
}
