interface QuizState<T> {
  items: T[];
  currentItem: T | undefined;
  totalItems: number;
  currentGuess: number;
  correctGuesses: number;
  accuracy: number;
  isComplete: boolean;
}

export class Quiz<T> {
  private _originalItems: T[] = [];
  private _items: T[] = [];
  private _currentGuess = 1;
  private _correctGuesses = 0;
  private _accuracy = 100;
  private _isComplete = false;

  get state(): QuizState<T> {
    return {
      items: this._items.slice(),
      currentItem: this._items.slice()[0],
      totalItems: this._originalItems.length,
      currentGuess: this._currentGuess,
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
    this._originalItems = items.slice();
    this._items = items.slice();
  }

  makeGuess(isCorrect: boolean): void {
    if (this._isComplete) {
      return;
    }

    if (isCorrect) {
      this._items.shift();
      this._correctGuesses++;
      // End the game if there are no remaining items left to guess
      if (!this._items.length) {
        this._accuracy = this._calculateAccuracy(this._currentGuess, this._originalItems.length);
        this._isComplete = true;
      }
    } else {
      this._items = this._movedGuessedItemToEnd(this._items);
    }

    // Increment the guess counter if the game isn't over, regardless of whether the guess was right or wrong
    if (!this._isComplete) {
      this._currentGuess++;
    }
  }

  private _movedGuessedItemToEnd(items: T[]): T[] {
    const guessedItem = items[0];
    const updatedItems = items.slice(1);
    updatedItems.push(guessedItem);
    return updatedItems;
  }

  private _calculateAccuracy(guesses: number, totalItems: number): number {
    return Math.round((totalItems / guesses) * 100);
  }
}
