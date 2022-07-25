export interface QuizState<T> {
  items: T[];
  currentItem: T | undefined;
  itemsTotal: number;
  currentGuess: number;
  correctGuesses: number;
  accuracy: number;
  isComplete: boolean;
}

export class Quiz<T> {
  private _queue: T[] = [];
  private _items: T[] = [];
  private _correctGuesses = 0;
  private _totalGuesses = 0;
  private _accuracy = 100;
  private _isComplete = false;

  get state(): QuizState<T> {
    return {
      items: this._items.slice(),
      itemsTotal: this._items.length,
      currentItem: this._queue.slice()[0],
      currentGuess: this._totalGuesses + 1,
      correctGuesses: this._correctGuesses,
      accuracy: this._accuracy,
      isComplete: this._isComplete,
    };
  }

  constructor(items: T[] = []) {
    this._queue = items.slice();
    this._items = items.slice();
  }

  guess(isCorrect: boolean): void {
    if (this._isComplete) {
      return;
    }

    this._totalGuesses++;

    if (isCorrect) {
      this._queue.shift();
      this._correctGuesses++;
    } else {
      const guessedItem = this._queue.shift();
      if (guessedItem) {
        this._queue.push(guessedItem);
      }
    }

    this._accuracy = Math.round((this._correctGuesses / this._totalGuesses) * 100);
    this._isComplete = !this._queue.length;
  }
}
