import { EXPANSIONS } from '../game/expansions';
import { Options } from '../game/options';
import type { Config } from './config.interface';
import { createGameSetup } from './create-game-setup';

describe('createGameSetup', () => {
  it('returns a randomly-generated game setup', () => {
    const options = new Options();
    const mockConfig: Config = {
      expansions: [...EXPANSIONS],
      players: 4,
      difficultyRange: [5, 8],
      spiritNames: options.spiritNames,
      mapNames: options.mapNames,
      boardNames: options.boardNames,
      scenarioNames: options.scenarioNames,
      adversaryLevelIds: options.adversaryLevelIds,
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
