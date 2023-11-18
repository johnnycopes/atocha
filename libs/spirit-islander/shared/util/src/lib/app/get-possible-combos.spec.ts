import { Options } from '../game/options';
import { getPossibleCombos } from './get-possible-combos';

describe('getPossibleCombos', () => {
  it('returns no combos when passed empty options', () => {
    expect(
      getPossibleCombos({
        expansions: [],
        maps: [],
        adversaryLevels: [],
        scenarios: [],
        difficultyRange: [0, 0],
      })
    ).toEqual([]);
  });

  it('returns posible combos when passed options', () => {
    expect(
      getPossibleCombos({
        expansions: ['Jagged Earth', 'Promo Pack 2'],
        maps: Options.allMaps,
        adversaryLevels: [
          { id: 'bp-0', name: 'Level 0', difficulty: 1 },
          { id: 'bp-1', name: 'Level 1', difficulty: 2 },
        ],
        scenarios: [
          {
            name: 'Elemental Invocation',
            difficulty: 0,
            expansion: 'Jagged Earth',
          },
          {
            name: 'Varied Terrains',
            difficulty: 2,
            expansion: 'Promo Pack 2',
          },
        ],
        difficultyRange: [0, 3],
      })
    ).toHaveLength(5);
  });
});
