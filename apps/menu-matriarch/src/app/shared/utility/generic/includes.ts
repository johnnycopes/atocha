import { lower } from "./format";

export function includes(collection: string[], value: string | string[]): boolean {
  const valueArr = typeof value === 'string' ? [value] : value.slice();
  return collection.some(
    str => valueArr.some(
      value => lower(str).includes(lower(value))
    )
  );
}
