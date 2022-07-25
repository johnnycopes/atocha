import { Quiz } from './quiz';

describe('Quiz', () => {
  it('initializes state when passed no data', () => {
    expect(new Quiz().state).toStrictEqual({
      currentItem: undefined,
      totalItems: 0,
      currentGuess: 1,
      correctGuesses: 0,
      accuracy: 100,
      isComplete: false,
    });
  });

  it('initalizes state when passed data', () => {
    expect(new Quiz(['French', 'Italian', 'Portuguese']).state).toStrictEqual({
      currentItem: 'French',
      totalItems: 3,
      currentGuess: 1,
      correctGuesses: 0,
      accuracy: 100,
      isComplete: false,
    });
  });

  it('returns state after correct guess', () => {
    const quiz = new Quiz(['French', 'Italian', 'Portuguese']);
    quiz.makeGuess(true);

    expect(quiz.state).toStrictEqual({
      currentItem: 'Italian',
      totalItems: 3,
      currentGuess: 2,
      correctGuesses: 1,
      accuracy: 100,
      isComplete: false,
    });
  });

  it('returns state after incorrect guess', () => {
    const quiz = new Quiz(['French', 'Italian', 'Portuguese']);
    quiz.makeGuess(false);

    expect(quiz.state).toStrictEqual({
      currentItem: 'Italian',
      totalItems: 3,
      currentGuess: 2,
      correctGuesses: 0,
      accuracy: 0,
      isComplete: false,
    });
  });

  it('returns state after partially completing quiz', () => {
    const quiz = new Quiz(['French', 'Italian', 'Portuguese']);
    quiz.makeGuess(true);
    quiz.makeGuess(false);
    quiz.makeGuess(false);
    quiz.makeGuess(true);
    quiz.makeGuess(false);

    expect(quiz.state).toStrictEqual({
      currentItem: 'Portuguese',
      totalItems: 3,
      currentGuess: 6,
      correctGuesses: 2,
      accuracy: 40,
      isComplete: false,
    });
  });

  it('returns state after fully completing quiz', () => {
    const quiz = new Quiz(['French', 'Italian', 'Portuguese']);
    quiz.makeGuess(true);
    quiz.makeGuess(false);
    quiz.makeGuess(true);
    quiz.makeGuess(true);

    expect(quiz.state).toStrictEqual({
      currentItem: undefined,
      totalItems: 3,
      currentGuess: 5,
      correctGuesses: 3,
      accuracy: 75,
      isComplete: true,
    });
  });
});
