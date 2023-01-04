import { Region } from '../domain/region.interface';
import { mapRegionsToPlaceModel } from './map-regions-to-place-model';

describe('mapRegionsToPlaceModel', () => {
  it('returns a fully-selected PlaceSelection object', () => {
    const regions: Region[] = [
      {
        name: 'Americas',
        subregions: [
          {
            name: 'North America',
            countries: [],
          },
          {
            name: 'Central America',
            countries: [],
          },
          {
            name: 'South America',
            countries: [],
          },
        ],
      },
    ];

    expect(mapRegionsToPlaceModel(regions)).toEqual([
      'North America',
      'Central America',
      'South America',
    ]);
  });
});
