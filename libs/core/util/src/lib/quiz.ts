export class Quiz<T> {
  private _items: T[] = [];
  private _guess = 1;
  private _correctGuesses = 0;
  private _accuracy = 100;
  private _isComplete = false;

  get quiz() {
    return {
      items: this._items.slice(),
      totalItems: this._items.length,
      guess: this._guess,
      correctGuesses: this._correctGuesses,
      accuracy: this._accuracy,
      isComplete: this._isComplete,
    };
  }

  constructor({
    items = [],
  }: {
    items?: T[],
  } = {}) {
    this._items = items;
  }
}
