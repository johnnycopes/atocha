import { Country, Region } from '@atocha/globetrotter/util';
import { createTree } from './create-tree';

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
    expect(
      createTree({
        root: 'Places',
        regions: MOCK_REGIONS,
      })
    ).toEqual({
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
