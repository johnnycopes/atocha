import { AFRICA, getChildren, getId } from '../../shared/mock-data';
import { IdsMap, createMap } from './create-map';

describe('createMap', () => {
  it("returns a flat map structure with references to every node's parent ID and children IDs", () => {
    expect(createMap(AFRICA, getId, getChildren)).toStrictEqual<IdsMap>(
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
