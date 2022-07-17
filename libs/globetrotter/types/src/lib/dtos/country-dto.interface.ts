export interface CountryDto {
  altSpellings: string[];
  area: number;
  borders: string[];
  capital: string[];
  car: {
    side: 'left' | 'right';
    signs: string[];
  };
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  coatOfArms: {
    png: string;
    svg: string;
  };
  continents: string[];
  currencies: {
    [code: string]: {
      name: string;
      symbol: string;
    };
  };
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
  gini: {
    [key: number]: number;
  };
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
  region: string;
  startOfWeek: string;
  status: string;
  subregion: string;
  timezones: string[];
  tld: string[];
  translations: {
    ces: {
      official: string;
      common: string;
    };
    deu: {
      official: string;
      common: string;
    };
    est: {
      official: string;
      common: string;
    };
    fin: {
      official: string;
      common: string;
    };
    fra: {
      official: string;
      common: string;
    };
    hrv: {
      official: string;
      common: string;
    };
    hun: {
      official: string;
      common: string;
    };
    ita: {
      official: string;
      common: string;
    };
    jpn: {
      official: string;
      common: string;
    };
    kor: {
      official: string;
      common: string;
    };
    nld: {
      official: string;
      common: string;
    };
    per: {
      official: string;
      common: string;
    };
    pol: {
      official: string;
      common: string;
    };
    por: {
      official: string;
      common: string;
    };
    rus: {
      official: string;
      common: string;
    };
    slk: {
      official: string;
      common: string;
    };
    spa: {
      official: string;
      common: string;
    };
    swe: {
      official: string;
      common: string;
    };
    urd: {
      official: string;
      common: string;
    };
    zho: {
      official: string;
      common: string;
    };
  };
  unMember: boolean;
}
