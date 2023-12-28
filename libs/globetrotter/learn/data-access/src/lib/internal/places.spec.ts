import {
  DJIBOUTI,
  MONTENEGRO,
  PHILIPPINES,
  SEYCHELLES,
} from './mock-data/countries';
import { Places } from './places';

describe('Places', () => {
  let places: Places;

  beforeEach(() => {
    places = new Places([DJIBOUTI, MONTENEGRO, PHILIPPINES, SEYCHELLES]);
  });

  it('has countries data', () => {
    expect(places.countries).toStrictEqual([
      DJIBOUTI,
      MONTENEGRO,
      PHILIPPINES,
      SEYCHELLES,
    ]);
  });

  it('has countriesBySubregion data', () => {
    expect(places.countriesBySubregion).toStrictEqual({
      'Eastern Africa': [DJIBOUTI, SEYCHELLES],
      'South-Eastern Asia': [PHILIPPINES],
      'Southeast Europe': [MONTENEGRO],
    });
  });

  it('has regions data', () => {
    expect(places.regions).toStrictEqual([
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
