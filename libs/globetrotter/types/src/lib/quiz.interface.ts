import { Country } from './domain/country.interface';
import { QuizType } from './quiz-type.enum';

export interface Quiz {
  guess: number;
  accuracy: number;
  isComplete: boolean;
  totalCountries: number;
  correctGuesses: number;
  countries: Country[];
  type: QuizType;
}
