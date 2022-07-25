import { Quiz } from './quiz';

describe('Quiz', () => {
  it('initializes when passed no data', () => {
    expect(new Quiz().quiz).toEqual({
      items: [],
      totalItems: 0,
      guess: 1,
      correctGuesses: 0,
      accuracy: 100,
      isComplete: false,
    });
  });
});
