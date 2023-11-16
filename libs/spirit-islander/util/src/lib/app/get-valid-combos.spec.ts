import { getValidCombos } from './get-valid-combos';
import type { Config } from './config.interface';
import { Options } from '../game/options';

describe('getValidCombos', () => {
  it('returns possible combinations for lowest difficulty', () => {
    const mockConfig: Config = {
      expansions: Options.allExpansions,
      players: 1,
      difficultyRange: [0, 0],
      spiritNames: Options.allSpiritNames,
      mapNames: Options.allMapNames,
      boardNames: Options.allBoardNames,
      scenarioNames: Options.allScenarioNames,
      adversaryLevelIds: Options.allAdversaryLevelIds,
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
      expansions: Options.allExpansions,
      players: 1,
      difficultyRange: [0, 11],
      spiritNames: Options.allSpiritNames,
      mapNames: Options.allMapNames,
      boardNames: Options.allBoardNames,
      scenarioNames: Options.allScenarioNames,
      adversaryLevelIds: Options.allAdversaryLevelIds,
    };
    expect(getValidCombos(mockConfig)).toHaveLength(1215);
  });
});
