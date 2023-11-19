import { Options } from '@atocha/spirit-islander/shared/util';
import { Config } from './config.interface';
import { getValidCombos } from './get-valid-combos';

describe('getValidCombos', () => {
  it('returns possible combinations for lowest difficulty', () => {
    const mockConfig: Config = {
      expansions: Options.allExpansions,
      players: 1,
      difficultyRange: [0, 0],
      spiritNames: Options.getNames(Options.allSpirits),
      mapNames: Options.getNames(Options.allMaps),
      boardNames: Options.getNames(Options.allBoards),
      scenarioNames: Options.getNames(Options.allScenarios),
      adversaryLevelIds: Options.getAdversaryLevelIds(Options.allAdversaries),
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
      spiritNames: Options.getNames(Options.allSpirits),
      mapNames: Options.getNames(Options.allMaps),
      boardNames: Options.getNames(Options.allBoards),
      scenarioNames: Options.getNames(Options.allScenarios),
      adversaryLevelIds: Options.getAdversaryLevelIds(Options.allAdversaries),
    };
    expect(getValidCombos(mockConfig)).toHaveLength(1215);
  });
});