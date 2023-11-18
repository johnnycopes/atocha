import { Config, Options } from '@atocha/spirit-islander/shared/util';
import { createGameSetup } from './create-game-setup';

describe('createGameSetup', () => {
  it('returns a randomly-generated game setup', () => {
    const mockConfig: Config = {
      expansions: Options.allExpansions,
      players: 4,
      difficultyRange: [5, 8],
      spiritNames: Options.getNames(Options.allSpirits),
      mapNames: Options.getNames(Options.allMaps),
      boardNames: Options.getNames(Options.allBoards),
      scenarioNames: Options.getNames(Options.allScenarios),
      adversaryLevelIds: Options.getAdversaryLevelIds(Options.allAdversaries),
    };
    const { boards, spirits, expansions, difficulty } =
      createGameSetup(mockConfig);

    expect(boards).toHaveLength(4);
    expect(spirits).toHaveLength(4);
    expect(expansions).toStrictEqual([
      'Branch & Claw',
      'Horizons',
      'Jagged Earth',
      'Promo Pack 1',
      'Promo Pack 2',
    ]);
    expect(difficulty).toBeGreaterThanOrEqual(5);
    expect(difficulty).toBeLessThanOrEqual(8);
  });
});
