import { createTally } from './create-tally';

export class Tally {
  private _tally: Record<string, number> = {};

  get values() {
    return { ...this._tally };
  }

  constructor(arr: readonly string[] = []) {
    this._tally = createTally(arr);
  }
}
