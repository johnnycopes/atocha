import { CountryDto } from '../internal/country-dto.interface';

export const DJIBOUTI_DTO: CountryDto = {
  name: {
    common: 'Djibouti',
    official: 'Republic of Djibouti',
    nativeName: {
      ara: {
        official: 'جمهورية جيبوتي',
        common: 'جيبوتي‎',
      },
      fra: {
        official: 'République de Djibouti',
        common: 'Djibouti',
      },
    },
  },
  tld: ['.dj'],
  cioc: 'DJI',
  currencies: {
    DJF: {
      name: 'Djiboutian franc',
      symbol: 'Fr',
    },
  },
  idd: {
    root: '+2',
    suffixes: ['53'],
  },
  capital: ['Djibouti'],
  region: 'Africa',
  subregion: 'Eastern Africa',
  languages: {
    ara: 'Arabic',
    fra: 'French',
  },
  area: 23200,
  demonyms: {
    eng: {
      f: 'Djibouti',
      m: 'Djibouti',
    },
    fra: {
      f: 'Djiboutienne',
      m: 'Djiboutien',
    },
  },
  population: 988002,
  flags: {
    png: 'https://flagcdn.com/w320/dj.png',
    svg: 'https://flagcdn.com/dj.svg',
    alt: 'The flag of Djibouti is composed of two equal horizontal bands of light blue and light green, with a white isosceles triangle superimposed on the hoist side of the field. The triangle has its base on the hoist end, spans about two-fifth the width of the field and bears a red five-pointed star at its center.',
  },
};

export const MONTENEGRO_DTO: CountryDto = {
  name: {
    common: 'Montenegro',
    official: 'Montenegro',
    nativeName: {
      cnr: {
        official: 'Црна Гора',
        common: 'Црна Гора',
      },
    },
  },
  tld: ['.me'],
  cioc: 'MNE',
  currencies: {
    EUR: {
      name: 'Euro',
      symbol: '€',
    },
  },
  idd: {
    root: '+3',
    suffixes: ['82'],
  },
  capital: ['Podgorica'],
  region: 'Europe',
  subregion: 'Southeast Europe',
  languages: {
    cnr: 'Montenegrin',
  },
  area: 13812,
  demonyms: {
    eng: {
      f: 'Montenegrin',
      m: 'Montenegrin',
    },
    fra: {
      f: 'Monténégrine',
      m: 'Monténégrin',
    },
  },
  population: 621718,
  flags: {
    png: 'https://flagcdn.com/w320/me.png',
    svg: 'https://flagcdn.com/me.svg',
    alt: 'The flag of Montenegro features a large red central rectangular area surrounded by a golden-yellow border. The coat of arms of Montenegro is centered in the red rectangle.',
  },
};

export const PHILIPPINES_DTO: CountryDto = {
  name: {
    common: 'Philippines',
    official: 'Republic of the Philippines',
    nativeName: {
      eng: {
        official: 'Republic of the Philippines',
        common: 'Philippines',
      },
      fil: {
        official: 'Republic of the Philippines',
        common: 'Pilipinas',
      },
    },
  },
  tld: ['.ph'],
  cioc: 'PHI',
  currencies: {
    PHP: {
      name: 'Philippine peso',
      symbol: '₱',
    },
  },
  idd: {
    root: '+6',
    suffixes: ['3'],
  },
  capital: ['Manila'],
  region: 'Asia',
  subregion: 'South-Eastern Asia',
  languages: {
    eng: 'English',
    fil: 'Filipino',
  },
  area: 342353,
  demonyms: {
    eng: {
      f: 'Filipino',
      m: 'Filipino',
    },
    fra: {
      f: 'Philippine',
      m: 'Philippin',
    },
  },
  population: 109581085,
  flags: {
    png: 'https://flagcdn.com/w320/ph.png',
    svg: 'https://flagcdn.com/ph.svg',
    alt: "Description of Phillipines' flag",
  },
};

export const SEYCHELLES_DTO: CountryDto = {
  name: {
    common: 'Seychelles',
    official: 'Republic of Seychelles',
    nativeName: {
      crs: {
        official: 'Repiblik Sesel',
        common: 'Sesel',
      },
      eng: {
        official: 'Republic of Seychelles',
        common: 'Seychelles',
      },
      fra: {
        official: 'République des Seychelles',
        common: 'Seychelles',
      },
    },
  },
  tld: ['.sc'],
  cioc: 'SEY',
  currencies: {
    SCR: {
      name: 'Seychellois rupee',
      symbol: '₨',
    },
  },
  idd: {
    root: '+2',
    suffixes: ['48'],
  },
  capital: ['Victoria'],
  region: 'Africa',
  subregion: 'Eastern Africa',
  languages: {
    crs: 'Seychellois Creole',
    eng: 'English',
    fra: 'French',
  },
  area: 452,
  demonyms: {
    eng: {
      f: 'Seychellois',
      m: 'Seychellois',
    },
    fra: {
      f: 'Seychelloise',
      m: 'Seychellois',
    },
  },
  population: 98462,
  flags: {
    png: 'https://flagcdn.com/w320/sc.png',
    svg: 'https://flagcdn.com/sc.svg',
    alt: "Description of Seychelle's flag",
  },
};
