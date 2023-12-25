import { Country, Region } from '@atocha/globetrotter/util';
import { createPlaceRoot } from './create-places-root';

describe('createPlaceRoot', () => {
  it('returns a consistent tree from regions data', () => {
    const MOCK_REGIONS: Region[] = [
      {
        name: 'Africa',
        subregions: [
          {
            name: 'Northern Africa',
            countries: [{}, {}, {}] as Country[],
          },
          {
            name: 'Western Africa',
            countries: [{}, {}] as Country[],
          },
        ],
      },
    ];

    expect(createPlaceRoot('Places', MOCK_REGIONS)).toEqual({
      name: 'Places',
      regions: [
        {
          name: 'Africa',
          subregions: [
            { name: 'Northern Africa', countries: [{}, {}, {}] },
            { name: 'Western Africa', countries: [{}, {}] },
          ],
        },
      ],
    });
  });
});
