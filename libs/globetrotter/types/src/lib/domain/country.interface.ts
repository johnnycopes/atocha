export interface Country {
  /** Area in km² */
  area: number;
  capital: string;
  /**
   * A unique three-letter country code used by the
   * International Olympics Committee (IOC)
   * https://en.wikipedia.org/wiki/List_of_IOC_country_codes
   */
  cioc: string;
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  /** The name for an inhabitant of a specific place */
  demonym: string;
  flag: string;
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
