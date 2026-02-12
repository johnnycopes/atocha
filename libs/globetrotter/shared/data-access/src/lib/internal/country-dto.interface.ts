// Source: https://restcountries.com/#api-endpoints-v3

export interface CountryDto {
  area: number;
  capital: string[];
  /**
   * A [unique three-letter country code]
   * {@link https://en.wikipedia.org/wiki/List_of_IOC_country_codes}
   * used by the International Olympics Committee (IOC)
   */
  cioc: string | undefined;
  /**
   * Codes of accepted currencies [(ISO 4217)]
   * {@link https://en.wikipedia.org/wiki/ISO_4217}
   */
  currencies: {
    [code: string]: {
      name: string;
      symbol: string;
    };
  };
  /** The name for an inhabitant of a specific place */
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
    fra: {
      f: string;
      m: string;
    };
  };
  flags: {
    svg: string;
    png: string;
    alt: string;
  };
  /** Country calling code(s) for [international direct dialing]
   * {@link https://en.wikipedia.org/wiki/List_of_country_calling_codes}
   */
  idd: {
    root: string;
    suffixes: string[];
  };
  languages: {
    [key: string]: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  population: number;
  region: string;
  subregion: string;
  /**
   * The domain associated with the country shown at the end of website URLs
   * {@link https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains}
   */
  tld: string[];
}
