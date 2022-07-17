export interface Country {
  /** Area in km² */
  area: number;
  /** Country calling code for [international direct dialing]
   * {@link https://en.wikipedia.org/wiki/List_of_country_calling_codes}
   */
  callingCodes: string[];
  capital: string;
  /**
   * A [unique three-letter country code]
   * {@link https://en.wikipedia.org/wiki/List_of_IOC_country_codes}
   * used by the International Olympics Committee (IOC)
   */
  cioc: string;
  /**
   * Codes of accepted currencies [(ISO 4217)]
   * {@link https://en.wikipedia.org/wiki/ISO_4217}
   */
  currencies: string[];
  /** The name for an inhabitant of a specific place */
  demonym: string;
  flag: string;
  languages: string[];
  name: string;
  population: number;
  region: string;
  subregion: string;
  topLevelDomain: string[];
}
