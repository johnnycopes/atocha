import { BOARDS } from '../data';
import { getBoards } from './get-boards';

describe('getBoards', () => {
  it('returns all boards if expansions argument is omitted', () => {
    expect(getBoards()).toStrictEqual(BOARDS);
  });

  it('returns boards from base game', () => {
    expect(getBoards({ expansions: [] })).toStrictEqual([
      { name: 'A', thematicName: 'Northeast' },
      { name: 'B', thematicName: 'East' },
      { name: 'C', thematicName: 'Northwest' },
      { name: 'D', thematicName: 'West' },
    ]);
  });

  it('returns boards from base game plus any specified expansions', () => {
    expect(getBoards({ expansions: ['Jagged Earth'] })).toStrictEqual([
      { name: 'A', thematicName: 'Northeast' },
      { name: 'B', thematicName: 'East' },
      { name: 'C', thematicName: 'Northwest' },
      { name: 'D', thematicName: 'West' },
      { name: 'E', thematicName: 'Southeast', expansion: 'Jagged Earth' },
      { name: 'F', thematicName: 'Southwest', expansion: 'Jagged Earth' },
    ]);
  });

  it('returns boards with certain names', () => {
    expect(getBoards({ names: ['B', 'C'] })).toStrictEqual([
      { name: 'B', thematicName: 'East' },
      { name: 'C', thematicName: 'Northwest' },
    ]);
  });
});
