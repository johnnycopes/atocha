export function selectRandom<T>(options: readonly T[], quantity = 1): T[] {
  if (quantity > options.length) {
    throw new Error('More options requested than available');
  }

  const selectedOptions: T[] = [];
  const usedIndexes = new Set<number>();

  for (let i = 0; i < quantity; i++) {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * options.length);
    } while (usedIndexes.has(randomIndex));

    selectedOptions.push(options[randomIndex]);
    usedIndexes.add(randomIndex);
  }

  return selectedOptions;
}
