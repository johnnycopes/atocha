import { Options } from '../game/options';
import type { Config } from './config.interface';
import { createGameSetup } from './create-game-setup';

describe('createGameSetup', () => {
  it('returns a randomly-generated game setup', () => {
    const mockConfig: Config = {
      expansions: Options.allExpansions,
      players: 4,
      difficultyRange: [5, 8],
      spiritNames: Options.allSpiritNames,
      mapNames: Options.allMapNames,
      boardNames: Options.allBoardNames,
      scenarioNames: Options.allScenarioNames,
      adversaryLevelIds: Options.allAdversaryLevelIds,
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
