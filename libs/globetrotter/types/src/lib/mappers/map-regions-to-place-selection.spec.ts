import { Region } from '../domain/region.interface';
import { mapRegionsToPlaceSelection } from './map-regions-to-place-selection';

describe('mapRegionsToPlaceSelection', () => {
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

    expect(mapRegionsToPlaceSelection(regions)).toEqual({
      Americas: 'checked',
      'Central America': 'checked',
      'North America': 'checked',
      'South America': 'checked',
    });
  });
});
