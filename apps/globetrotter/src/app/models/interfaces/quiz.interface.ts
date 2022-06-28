import { QuizType } from '@atocha/types-globetrotter';
import { ICountry } from './country.interface';

export interface IQuiz {
  guess: number;
  accuracy: number;
  isComplete: boolean;
  totalCountries: number;
  correctGuesses: number;
  countries: ICountry[];
  type: QuizType;
}
