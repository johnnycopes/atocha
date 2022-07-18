import { Region } from '@atocha/globetrotter/types';
import { mapRegionsToPlaceSelection } from './map-regions-to-place-selection';

describe('mapRegionsToPlaceSelection', () => {
  it('returns a fully-selected PlaceSelection object', () => {
    const regions: Region[] = [
      {
        name: 'Americas',
        subregions: [
          {
            name: 'North America',
            region: 'Americas',
            countries: [],
          },
          {
            name: 'Central America',
            region: 'Americas',
            countries: [],
          },
          {
            name: 'South America',
            region: 'Americas',
            countries: [],
          }
        ]
      },
    ];

    expect(mapRegionsToPlaceSelection(regions)).toEqual({
      Americas: 'checked',
      'Central America': 'checked',
      'North America': 'checked',
      'South America': 'checked',
    });
  })
});
