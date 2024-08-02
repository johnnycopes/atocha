export function memo(start: number) {
  let value = start;

  return function increment() {
    const valueToReturn = value.toString();
    value++;
    return valueToReturn;
  };
}
