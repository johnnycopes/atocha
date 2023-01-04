import { isRegion, Place } from '@atocha/globetrotter/util';
import { createTree } from './create-tree';

describe('createTree', () => {
  it('returns a consistent tree from regions data', () => {
    const MOCK_REGIONS: Place[] = [
      {
        name: 'Africa',
        subregions: [
          {
            name: 'Northern Africa',
            countries: [],
          },
          {
            name: 'Western Africa',
            countries: [],
          },
        ],
      },
    ];
    expect(
      createTree({
        root: 'Places',
        items: MOCK_REGIONS,
        getId: ({ name }) => name,
        getChildren: (place: Place) =>
          isRegion(place) ? place.subregions : [],
      })
    ).toEqual({
      id: 'Places',
      children: [
        {
          id: 'Africa',
          children: [{ id: 'Northern Africa' }, { id: 'Western Africa' }],
        },
      ],
    });
  });
});
