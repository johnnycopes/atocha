import { MONTENEGRO, SEYCHELLES } from './mock-data/countries';
import {
  DJIBOUTI_DTO,
  MONTENEGRO_DTO,
  PHILLIPINES_DTO,
  PUERTO_RICO_DTO,
  SEYCHELLES_DTO,
} from './mock-data/country-dtos';
import { Places } from './places';

describe('Places', () => {
  it('has countries data', () => {
    expect(new Places([MONTENEGRO_DTO, SEYCHELLES_DTO]).countries).toEqual([
      MONTENEGRO,
      SEYCHELLES,
    ]);
  });

  it('has countriesBySubregion data', () => {
    expect(
      new Places([
        DJIBOUTI_DTO,
        MONTENEGRO_DTO,
        PHILLIPINES_DTO,
        PUERTO_RICO_DTO,
        SEYCHELLES_DTO,
      ]).countriesBySubregion
    ).toEqual({
      'Eastern Africa': [
        {
          area: 23200,
          callingCodes: ['+253'],
          capital: 'Djibouti',
          currencies: ['DJF'],
          demonym: 'Djibouti',
          flag: 'https://flagcdn.com/dj.svg',
          id: 'DJI',
          languages: ['Arabic', 'French'],
          name: 'Djibouti',
          population: 988002,
          region: 'Africa',
          subregion: 'Eastern Africa',
          topLevelDomain: ['.dj'],
        },
        {
          area: 452,
          callingCodes: ['+248'],
          capital: 'Victoria',
          currencies: ['SCR'],
          demonym: 'Seychellois',
          flag: 'https://flagcdn.com/sc.svg',
          id: 'SEY',
          languages: ['Seychellois Creole', 'English', 'French'],
          name: 'Seychelles',
          population: 98462,
          region: 'Africa',
          subregion: 'Eastern Africa',
          topLevelDomain: ['.sc'],
        },
      ],
      'South-Eastern Asia': [
        {
          area: 342353,
          callingCodes: ['+63'],
          capital: 'Manila',
          currencies: ['PHP'],
          demonym: 'Filipino',
          flag: 'https://flagcdn.com/ph.svg',
          id: 'PHI',
          languages: ['English', 'Filipino'],
          name: 'Philippines',
          population: 109581085,
          region: 'Asia',
          subregion: 'South-Eastern Asia',
          topLevelDomain: ['.ph'],
        },
      ],
      'Southeast Europe': [
        {
          area: 13812,
          callingCodes: ['+382'],
          capital: 'Podgorica',
          currencies: ['EUR'],
          demonym: 'Montenegrin',
          flag: 'https://flagcdn.com/me.svg',
          id: 'MNE',
          languages: ['Montenegrin'],
          name: 'Montenegro',
          population: 621718,
          region: 'Europe',
          subregion: 'Southeast Europe',
          topLevelDomain: ['.me'],
        },
      ],
    });
  });

  it('has regions data', () => {
    expect(
      new Places([
        DJIBOUTI_DTO,
        MONTENEGRO_DTO,
        PHILLIPINES_DTO,
        PUERTO_RICO_DTO,
        SEYCHELLES_DTO,
      ]).regions
    ).toEqual([
      {
        name: 'Africa',
        subregions: [
          {
            countries: [
              {
                area: 23200,
                callingCodes: ['+253'],
                capital: 'Djibouti',
                currencies: ['DJF'],
                demonym: 'Djibouti',
                flag: 'https://flagcdn.com/dj.svg',
                id: 'DJI',
                languages: ['Arabic', 'French'],
                name: 'Djibouti',
                population: 988002,
                region: 'Africa',
                subregion: 'Eastern Africa',
                topLevelDomain: ['.dj'],
              },
              {
                area: 452,
                callingCodes: ['+248'],
                capital: 'Victoria',
                currencies: ['SCR'],
                demonym: 'Seychellois',
                flag: 'https://flagcdn.com/sc.svg',
                id: 'SEY',
                languages: ['Seychellois Creole', 'English', 'French'],
                name: 'Seychelles',
                population: 98462,
                region: 'Africa',
                subregion: 'Eastern Africa',
                topLevelDomain: ['.sc'],
              },
            ],
            name: 'Eastern Africa',
          },
        ],
      },
      {
        name: 'Europe',
        subregions: [
          {
            countries: [
              {
                area: 13812,
                callingCodes: ['+382'],
                capital: 'Podgorica',
                currencies: ['EUR'],
                demonym: 'Montenegrin',
                flag: 'https://flagcdn.com/me.svg',
                id: 'MNE',
                languages: ['Montenegrin'],
                name: 'Montenegro',
                population: 621718,
                region: 'Europe',
                subregion: 'Southeast Europe',
                topLevelDomain: ['.me'],
              },
            ],
            name: 'Southeast Europe',
          },
        ],
      },
      {
        name: 'Asia',
        subregions: [
          {
            countries: [
              {
                area: 342353,
                callingCodes: ['+63'],
                capital: 'Manila',
                currencies: ['PHP'],
                demonym: 'Filipino',
                flag: 'https://flagcdn.com/ph.svg',
                id: 'PHI',
                languages: ['English', 'Filipino'],
                name: 'Philippines',
                population: 109581085,
                region: 'Asia',
                subregion: 'South-Eastern Asia',
                topLevelDomain: ['.ph'],
              },
            ],
            name: 'South-Eastern Asia',
          },
        ],
      },
    ]);
  });
});
