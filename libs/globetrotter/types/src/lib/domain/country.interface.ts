export interface Country {
  area: number;
  capital: string;
  cioc: string;
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  demonym: string;
  flag: string;
  gini: number;
  languages: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
  name: string;
  numericCode: string;
  population: number;
  region: string;
  subregion: string;
  topLevelDomain: string[];
}
