import { Country, Region } from '@atocha/globetrotter/util';
import { createPlaceTree } from './create-places-tree';

describe('createTree', () => {
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

    expect(createPlaceTree('Places', MOCK_REGIONS)).toEqual({
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