import { Quiz } from './quiz';

describe('Quiz', () => {
  it('initializes state when passed no data', () => {
    expect(new Quiz().state).toStrictEqual({
      items: [],
      currentItem: undefined,
      correctGuesses: 0,
      totalGuesses: 0,
      accuracy: 100,
      isComplete: false,
    });
  });

  it('initalizes state when passed data', () => {
    expect(new Quiz(['French', 'Italian', 'Portuguese']).state).toStrictEqual({
      items: ['French', 'Italian', 'Portuguese'],
      currentItem: 'French',
      correctGuesses: 0,
      totalGuesses: 0,
      accuracy: 100,
      isComplete: false,
    });
  });

  it('returns state after correct guess', () => {
    const quiz = new Quiz(['French', 'Italian', 'Portuguese']);
    quiz.guess(true);

    expect(quiz.state).toStrictEqual({
      items: ['French', 'Italian', 'Portuguese'],
      currentItem: 'Italian',
      correctGuesses: 1,
      totalGuesses: 1,
      accuracy: 100,
      isComplete: false,
    });
  });

  it('returns state after incorrect guess', () => {
    const quiz = new Quiz(['French', 'Italian', 'Portuguese']);
    quiz.guess(false);

    expect(quiz.state).toStrictEqual({
      items: ['French', 'Italian', 'Portuguese'],
      currentItem: 'Italian',
      correctGuesses: 0,
      totalGuesses: 1,
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
      currentItem: 'Portuguese',
      correctGuesses: 2,
      totalGuesses: 6,
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
      currentItem: undefined,
      correctGuesses: 3,
      totalGuesses: 4,
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
      currentItem: undefined,
      correctGuesses: 3,
      totalGuesses: 3,
      accuracy: 100,
      isComplete: true,
    });
  });
});
