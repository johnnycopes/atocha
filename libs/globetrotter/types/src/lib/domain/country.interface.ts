export interface Country {
  name: string;
  topLevelDomain: string[];
  capital: string;
  region: string;
  subregion: string;
  population: number;
  demonym: string;
  area: number;
  gini: number;
  numericCode: string;
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
  flag: string;
  cioc: string;
}
