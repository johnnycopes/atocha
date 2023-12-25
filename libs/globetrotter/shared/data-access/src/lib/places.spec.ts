import {
  DJIBOUTI,
  MONTENEGRO,
  PHILIPPINES,
  SEYCHELLES,
} from './internal/mock-data/countries';
import { Places } from './places';

describe('Places', () => {
  let places: Places;

  beforeEach(() => {
    places = new Places([DJIBOUTI, MONTENEGRO, PHILIPPINES, SEYCHELLES]);
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
