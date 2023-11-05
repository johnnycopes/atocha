import { TallyChange } from './calculate-tally-change';

export class Tally {
  private _tally: Record<string, number> = {};

  get values() {
    return { ...this._tally };
  }

  constructor(arr: readonly string[] = []) {
    this._tally = this._createTally(arr);
  }

  calculateChange(key: string, change: TallyChange): -1 | 0 | 1 {
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
    const map: Record<string, number> = {};
    for (const item of arr) {
      map[item] = (map[item] ?? 0) + 1;
    }
    return map;
  }
}
