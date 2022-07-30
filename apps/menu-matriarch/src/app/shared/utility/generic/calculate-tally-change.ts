export type TallyChange = 'increment' | 'decrement' | 'clear';

export function calculateTallyChange<T extends string | symbol | number>({ tally, key, change }: {
  tally: Record<T, number>,
  key: T,
  change: TallyChange,
}): 1 | 0 | -1 {
  if (!(key in tally) && (change === 'decrement' || change === 'clear')) {
    throw new Error('Cannot decrement or clear value: key is not present in tally');
  }
  const count = tally[key] ?? 0;
  if (count === 0 && change === 'increment') {
    return 1;
  } else if ((count === 1 && change === 'decrement') || change === 'clear') {
    return -1;
  }
  return 0;
}
