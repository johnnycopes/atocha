import {
  ADVERSARIES,
  EXPANSIONS,
  MAPS,
  SCENARIOS,
  getAdversaryLevelIds,
  getBoards,
  getNames,
  getSpirits,
} from '@atocha/spirit-islander/shared/util';
import { Config } from './config.interface';
import { getValidCombos } from './get-valid-combos';

describe('getValidCombos', () => {
  it('returns possible combinations for lowest difficulty', () => {
    const mockConfig: Config = {
      expansions: [
        'Branch & Claw',
        'Horizons',
        'Jagged Earth',
        'Promo Pack 1',
        'Promo Pack 2',
      ],
      players: 1,
      difficultyRange: [0, 0],
      spiritNames: [
        'Bringer of Dreams and Nightmares',
        'Vital Strength of the Earth',
      ],
      mapNames: ['Balanced'],
      boardNames: ['A', 'B', 'C'],
      scenarioNames: [
        'No Scenario',
        'Blitz',
        "Guard the Isle's Heart",
        'Second Wave',
        'A Diversity of Spirits',
        'Elemental Invocation',
      ],
      adversaryLevelIds: ['none'],
    };
    expect(getValidCombos(mockConfig)).toStrictEqual([
      [
        { name: 'Balanced', difficulty: 0 },
        { id: 'none', name: 'N/A', difficulty: 0 },
        { name: 'No Scenario', difficulty: 0 },
      ],
      [
        { name: 'Balanced', difficulty: 0 },
        { id: 'none', name: 'N/A', difficulty: 0 },
        { name: 'Blitz', difficulty: 0 },
      ],
      [
        { name: 'Balanced', difficulty: 0 },
        { id: 'none', name: 'N/A', difficulty: 0 },
        { name: "Guard the Isle's Heart", difficulty: 0 },
      ],
      [
        { name: 'Balanced', difficulty: 0 },
        { id: 'none', name: 'N/A', difficulty: 0 },
        { name: 'Second Wave', difficulty: 0, expansion: 'Branch & Claw' },
      ],
      [
        { name: 'Balanced', difficulty: 0 },
        { id: 'none', name: 'N/A', difficulty: 0 },
        {
          name: 'A Diversity of Spirits',
          difficulty: 0,
          expansion: 'Promo Pack 2',
        },
      ],
      [
        { name: 'Balanced', difficulty: 0 },
        { id: 'none', name: 'N/A', difficulty: 0 },
        {
          name: 'Elemental Invocation',
          difficulty: 0,
          expansion: 'Jagged Earth',
        },
      ],
    ]);
  });

  it('returns all possible combinations', () => {
    const mockConfig: Config = {
      expansions: EXPANSIONS,
      players: 1,
      difficultyRange: [0, 11],
      spiritNames: getNames(getSpirits()),
      mapNames: getNames(MAPS),
      boardNames: getNames(getBoards()),
      scenarioNames: getNames(SCENARIOS),
      adversaryLevelIds: getAdversaryLevelIds(ADVERSARIES),
    };
    expect(getValidCombos(mockConfig)).toHaveLength(1632);
  });
});
