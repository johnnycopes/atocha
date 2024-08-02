export function memo(start = 0) {
  let value = start;

  return function increment() {
    const valueToReturn = value.toString();
    value++;
    return valueToReturn;
  };
}
