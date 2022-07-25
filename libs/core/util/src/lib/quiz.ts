interface QuizState<T> {
  currentItem: T | undefined;
  totalItems: number;
  currentGuess: number;
  correctGuesses: number;
  accuracy: number;
  isComplete: boolean;
}

export class Quiz<T> {
  private _items: T[] = [];
  private _totalItems = 0;
  private _correctGuesses = 0;
  private _totalGuesses = 0;
  private _accuracy = 100;
  private _isComplete = false;

  get state(): QuizState<T> {
    return {
      currentItem: this._items.slice()[0],
      totalItems: this._totalItems,
      currentGuess: this._totalGuesses + 1,
      correctGuesses: this._correctGuesses,
      accuracy: this._accuracy,
      isComplete: this._isComplete,
    };
  }

  constructor(items: T[] = []) {
    this._items = items.slice();
    this._totalItems = items.length;
  }

  makeGuess(isCorrect: boolean): void {
    if (this._isComplete) {
      return;
    }

    this._totalGuesses++;

    if (isCorrect) {
      this._items.shift();
      this._correctGuesses++;
    } else {
      this._items = this._movedGuessedItemToEnd(this._items);
    }

    this._accuracy = this._calculateAccuracy(this._correctGuesses, this._totalGuesses);
    this._isComplete = !this._items.length;
  }

  private _movedGuessedItemToEnd(items: T[]): T[] {
    const guessedItem = items[0];
    const updatedItems = items.slice(1);
    updatedItems.push(guessedItem);
    return updatedItems;
  }

  private _calculateAccuracy(correctGuesses: number, totalGuesses: number): number {
    return Math.round((correctGuesses / totalGuesses) * 100);
  }
}
