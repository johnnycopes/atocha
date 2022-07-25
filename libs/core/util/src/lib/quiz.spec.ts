import { Quiz } from './quiz';

describe('Quiz', () => {
  it('initializes state when passed no data', () => {
    expect(new Quiz().state).toStrictEqual({
      items: [],
      currentItem: undefined,
      totalItems: 0,
      guess: 1,
      correctGuesses: 0,
      accuracy: 100,
      isComplete: false,
    });
  });

  it('initalizes state when passed data', () => {
    expect(new Quiz({items: ['English', 'Spanish', 'French', 'Italian', 'Portuguese'] }).state).toStrictEqual({
      items: ['English', 'Spanish', 'French', 'Italian', 'Portuguese'],
      currentItem: 'English',
      totalItems: 5,
      guess: 1,
      correctGuesses: 0,
      accuracy: 100,
      isComplete: false,
    });
  });

  it('returns state after correct guess', () => {
    const quiz = new Quiz({items: ['English', 'Spanish', 'French', 'Italian', 'Portuguese'] });
    quiz.makeGuess(true);

    expect(quiz.state).toStrictEqual({
      items: ['Spanish', 'French', 'Italian', 'Portuguese'],
      currentItem: 'Spanish',
      totalItems: 5,
      guess: 2,
      correctGuesses: 1,
      accuracy: 100,
      isComplete: false,
    })
  });
});
