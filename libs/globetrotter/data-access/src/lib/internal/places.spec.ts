import {
  DJIBOUTI,
  MONTENEGRO,
  PHILIPPINES,
  SEYCHELLES,
} from './mock-data/countries';
import {
  DJIBOUTI_DTO,
  MONTENEGRO_DTO,
  PHILIPPINES_DTO,
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
        PHILIPPINES_DTO,
        PUERTO_RICO_DTO,
        SEYCHELLES_DTO,
      ]).countriesBySubregion
    ).toEqual({
      'Eastern Africa': [DJIBOUTI, SEYCHELLES],
      'South-Eastern Asia': [PHILIPPINES],
      'Southeast Europe': [MONTENEGRO],
    });
  });

  it('has regions data', () => {
    expect(
      new Places([
        DJIBOUTI_DTO,
        MONTENEGRO_DTO,
        PHILIPPINES_DTO,
        PUERTO_RICO_DTO,
        SEYCHELLES_DTO,
      ]).regions
    ).toEqual([
      {
        name: 'Africa',
        subregions: [
          {
            name: 'Eastern Africa',
            countries: [DJIBOUTI, SEYCHELLES],
          },
        ],
      },
      {
        name: 'Europe',
        subregions: [
          {
            name: 'Southeast Europe',
            countries: [MONTENEGRO],
          },
        ],
      },
      {
        name: 'Asia',
        subregions: [
          {
            name: 'South-Eastern Asia',
            countries: [PHILIPPINES],
          },
        ],
      },
    ]);
  });
});
