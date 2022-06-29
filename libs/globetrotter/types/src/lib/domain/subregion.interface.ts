import { Country } from './country.interface';

export interface Subregion {
  name: string;
  region: string;
  countries: Country[];
}
