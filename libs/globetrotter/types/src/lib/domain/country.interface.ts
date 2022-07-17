export interface Country {
  /** Area in km² */
  area: number;
  capital: string;
  /**
   * A [unique three-letter country code]
   * (https://en.wikipedia.org/wiki/List_of_IOC_country_codes)
   * used by the International Olympics Committee (IOC)
   */
  cioc: string;
  /**
   * Codes of accepted currencies (ISO 4217)
   * [https://en.wikipedia.org/wiki/ISO_4217]
  */
  currencies: string[];
  /** The name for an inhabitant of a specific place */
  demonym: string;
  flag: string;
  languages: string[];
  name: string;
  numericCode: string;
  population: number;
  region: string;
  subregion: string;
  topLevelDomain: string[];
}
