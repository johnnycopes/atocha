import { getPlayers } from './get-players';

describe('getPlayers', () => {
  it('returns all possible number of players', () => {
    expect(getPlayers()).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
