export interface CountryDto {
  altSpellings: string[];
  /** Area in km² */
  area: number;
  borders?: string[];
  capital: string[];
  capitalInfo: {
    latlng: number[];
  };
  car: {
    side: 'left' | 'right';
    signs: string[];
  };
  cca2: string;
  ccn3: string;
  cca3: string;
  /**
   * A [unique three-letter country code]
   * {@link https://en.wikipedia.org/wiki/List_of_IOC_country_codes}
   * used by the International Olympics Committee (IOC)
   */
  cioc: string | undefined;
  coatOfArms: {
    png?: string;
    svg?: string;
  };
  continents: string[];
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
  fifa: string;
  flag: string;
  flags: {
    svg: string;
    png: string;
  };
  gini?: {
    [key: number]: number;
  };
  /** Country calling code(s) for [international direct dialing]
   * {@link https://en.wikipedia.org/wiki/List_of_country_calling_codes}
   */
  idd: {
    root: string;
    suffixes: string[];
  };
  independent: boolean;
  landlocked: boolean;
  languages: {
    [key: string]: string;
  };
  latlng: [number, number];
  maps: {
    googleMaps: string;
    openStreetMaps: string;
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
  postalCode?: {
    format: string;
    regex: string;
  };
  region: string;
  startOfWeek: string;
  status: string;
  subregion: string;
  timezones: string[];
  /**
   * The domain associated with the country shown at the end of website URLs
   * {@link https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains}
   */
  tld: string[];
  translations: {
    [languageCode: string]: {
      official: string;
      common: string;
    };
  };
  unMember: boolean;
}
