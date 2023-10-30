import { createIdsMap, IdsMap } from './create-ids-map';
import { AFRICA, getChildren, getId } from '../../mock-data';

describe('createIdsMap', () => {
  it("returns a flat map structure with references to every node's parent ID and children IDs", () => {
    expect(createIdsMap(AFRICA, getId, getChildren)).toEqual<IdsMap>(
      new Map([
        [
          'Africa',
          {
            parentId: undefined,
            childrenIds: [
              'Southern Africa',
              'Central Africa',
              'Northern Africa',
            ],
          },
        ],
        [
          'Southern Africa',
          { parentId: 'Africa', childrenIds: ['Swaziland', 'Namibia'] },
        ],
        ['Central Africa', { parentId: 'Africa', childrenIds: [] }],
        ['Northern Africa', { parentId: 'Africa', childrenIds: ['Morocco'] }],
        ['Swaziland', { parentId: 'Southern Africa', childrenIds: [] }],
        ['Namibia', { parentId: 'Southern Africa', childrenIds: [] }],
        [
          'Morocco',
          { parentId: 'Northern Africa', childrenIds: ['Marrakesh', 'Fes'] },
        ],
        ['Marrakesh', { parentId: 'Morocco', childrenIds: [] }],
        ['Fes', { parentId: 'Morocco', childrenIds: [] }],
      ])
    );
  });
});
