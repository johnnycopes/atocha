/* Uses the Durstenfeld shuffle algorithm */
export function shuffle<T>(arr: readonly T[]): readonly T[] {
  const items = arr.slice();

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }

  return items;
}
