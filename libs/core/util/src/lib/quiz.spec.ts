import { Quiz } from './quiz';

describe('Quiz', () => {
  it('initializes state when passed no data', () => {
    expect(new Quiz().state).toStrictEqual({
      items: [],
      itemsTotal: 0,
      currentItem: undefined,
      currentGuess: 1,
      correctGuesses: 0,
      accuracy: 100,
      isComplete: false,
    });
  });

  it('initalizes state when passed data', () => {
    expect(new Quiz(['French', 'Italian', 'Portuguese']).state).toStrictEqual({
      items: ['French', 'Italian', 'Portuguese'],
      itemsTotal: 3,
      currentItem: 'French',
      currentGuess: 1,
      correctGuesses: 0,
      accuracy: 100,
      isComplete: false,
    });
  });

  it('returns state after correct guess', () => {
    const quiz = new Quiz(['French', 'Italian', 'Portuguese']);
    quiz.guess(true);

    expect(quiz.state).toStrictEqual({
      items: ['French', 'Italian', 'Portuguese'],
      itemsTotal: 3,
      currentItem: 'Italian',
      currentGuess: 2,
      correctGuesses: 1,
      accuracy: 100,
      isComplete: false,
    });
  });

  it('returns state after incorrect guess', () => {
    const quiz = new Quiz(['French', 'Italian', 'Portuguese']);
    quiz.guess(false);

    expect(quiz.state).toStrictEqual({
      items: ['French', 'Italian', 'Portuguese'],
      itemsTotal: 3,
      currentItem: 'Italian',
      currentGuess: 2,
      correctGuesses: 0,
      accuracy: 0,
      isComplete: false,
    });
  });

  it('returns state after partially finishing quiz', () => {
    const quiz = new Quiz(['French', 'Italian', 'Portuguese']);
    quiz.guess(true);
    quiz.guess(false);
    quiz.guess(false);
    quiz.guess(true);
    quiz.guess(false);
    quiz.guess(false);

    expect(quiz.state).toStrictEqual({
      items: ['French', 'Italian', 'Portuguese'],
      itemsTotal: 3,
      currentItem: 'Portuguese',
      currentGuess: 7,
      correctGuesses: 2,
      accuracy: 33,
      isComplete: false,
    });
  });

  it('returns state after completing quiz', () => {
    const quiz = new Quiz(['French', 'Italian', 'Portuguese']);
    quiz.guess(true);
    quiz.guess(false);
    quiz.guess(true);
    quiz.guess(true);

    expect(quiz.state).toStrictEqual({
      items: ['French', 'Italian', 'Portuguese'],
      itemsTotal: 3,
      currentItem: undefined,
      currentGuess: 5,
      correctGuesses: 3,
      accuracy: 75,
      isComplete: true,
    });
  });

  it('prevents additional guesses after completing quiz', () => {
    const quiz = new Quiz(['French', 'Italian', 'Portuguese']);
    quiz.guess(true);
    quiz.guess(true);
    quiz.guess(true);
    quiz.guess(true);
    quiz.guess(true);

    expect(quiz.state).toStrictEqual({
      items: ['French', 'Italian', 'Portuguese'],
      itemsTotal: 3,
      currentItem: undefined,
      currentGuess: 4,
      correctGuesses: 3,
      accuracy: 100,
      isComplete: true,
    });
  });
});
