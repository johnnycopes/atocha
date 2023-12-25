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
  let places: Places;

  beforeEach(() => {
    places = new Places([
      DJIBOUTI_DTO,
      MONTENEGRO_DTO,
      PHILIPPINES_DTO,
      PUERTO_RICO_DTO,
      SEYCHELLES_DTO,
    ]);
  });

  it('has countries data', () => {
    expect(places.countries).toEqual([
      DJIBOUTI,
      MONTENEGRO,
      PHILIPPINES,
      SEYCHELLES,
    ]);
  });

  it('has countriesBySubregion data', () => {
    expect(places.countriesBySubregion).toEqual({
      'Eastern Africa': [DJIBOUTI, SEYCHELLES],
      'South-Eastern Asia': [PHILIPPINES],
      'Southeast Europe': [MONTENEGRO],
    });
  });

  it('has regions data', () => {
    expect(places.regions).toEqual([
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
