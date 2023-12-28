import { Region } from '@atocha/globetrotter/learn/util';
import { mapRegionsToPlacesModel } from './map-regions-to-places-model';

describe('mapRegionsToPlacesModel', () => {
  it('returns a fully-selected places model', () => {
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

    expect(mapRegionsToPlacesModel(regions)).toStrictEqual([
      'North America',
      'Central America',
      'South America',
    ]);
  });
});
