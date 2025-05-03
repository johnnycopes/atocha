import { BOARDS } from '../data';
import { getBoards } from './get-boards';

describe('getBoards', () => {
  it('returns all boards if expansions argument is omitted', () => {
    expect(getBoards()).toStrictEqual(BOARDS);
  });

  it('returns boards from base game', () => {
    expect(getBoards({ expansions: [] })).toStrictEqual([
      { name: 'A', thematicName: 'Northeast', thematicIdentifier: 'NorthEast' },
      { name: 'B', thematicName: 'East', thematicIdentifier: 'East' },
      { name: 'C', thematicName: 'Northwest', thematicIdentifier: 'NorthWest' },
      { name: 'D', thematicName: 'West', thematicIdentifier: 'West' },
    ]);
  });

  it('returns boards from base game plus any specified expansions', () => {
    expect(getBoards({ expansions: ['Jagged Earth'] })).toStrictEqual([
      { name: 'A', thematicName: 'Northeast', thematicIdentifier: 'NorthEast' },
      { name: 'B', thematicName: 'East', thematicIdentifier: 'East' },
      { name: 'C', thematicName: 'Northwest', thematicIdentifier: 'NorthWest' },
      { name: 'D', thematicName: 'West', thematicIdentifier: 'West' },
      {
        name: 'E',
        thematicName: 'Southeast',
        thematicIdentifier: 'SouthEast',
        expansion: 'Jagged Earth',
      },
      {
        name: 'F',
        thematicName: 'Southwest',
        thematicIdentifier: 'SouthWest',
        expansion: 'Jagged Earth',
      },
    ]);
  });

  it('returns boards with certain names', () => {
    expect(getBoards({ names: ['B', 'C'] })).toStrictEqual([
      { name: 'B', thematicName: 'East', thematicIdentifier: 'East' },
      { name: 'C', thematicName: 'Northwest', thematicIdentifier: 'NorthWest' },
    ]);
  });
});
