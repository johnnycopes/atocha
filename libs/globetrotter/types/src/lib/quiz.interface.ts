import { Country } from './domain/country.interface';

export interface Quiz {
  guess: number;
  accuracy: number;
  isComplete: boolean;
  totalCountries: number;
  correctGuesses: number;
  countries: Country[];
}
