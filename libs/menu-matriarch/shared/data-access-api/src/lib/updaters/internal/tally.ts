export type Change = 'increment' | 'decrement' | 'clear';
type Values = Record<string, number>;

export class Tally {
  private readonly _tally: Values = {};

  constructor(arr: readonly string[] = []) {
    this._tally = this._createTally(arr);
  }

  calculateChange(key: string, change: Change): -1 | 0 | 1 {
    if (
      !(key in this._tally) &&
      (change === 'decrement' || change === 'clear')
    ) {
      throw new Error(
        'Cannot decrement or clear value: key is not present in tally'
      );
    }

    const count = this._tally[key] ?? 0;
    if (count === 0 && change === 'increment') {
      return 1;
    } else if ((count === 1 && change === 'decrement') || change === 'clear') {
      return -1;
    }
    return 0;
  }

  private _createTally(arr: readonly string[]) {
    const map: Values = {};
    for (const item of arr) {
      map[item] = (map[item] ?? 0) + 1;
    }
    return map;
  }
}
