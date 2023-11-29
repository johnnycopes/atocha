import { Config } from '@atocha/spirit-islander/config/util';
import { createGameSetup } from './create-game-setup';
import {
  ADVERSARIES,
  EXPANSIONS,
  getAdversaryLevelIds,
  getBoards,
  getMaps,
  getNames,
  getScenarios,
  getSpirits,
} from '@atocha/spirit-islander/shared/util';

describe('createGameSetup', () => {
  it('returns a randomly-generated game setup', () => {
    const mockConfig: Config = {
      expansions: EXPANSIONS,
      players: 4,
      difficultyRange: [5, 8],
      spiritNames: getNames(getSpirits()),
      mapNames: getNames(getMaps()),
      boardNames: getNames(getBoards()),
      scenarioNames: getNames(getScenarios()),
      adversaryLevelIds: getAdversaryLevelIds(ADVERSARIES),
    };
    const { boards, spirits, expansions, difficulty } =
      createGameSetup(mockConfig);

    expect(boards).toHaveLength(4);
    expect(spirits).toHaveLength(4);
    expect(expansions).toStrictEqual([
      'Branch & Claw',
      'Horizons',
      'Jagged Earth',
      'Nature Incarnate',
      'Promo Pack 1',
      'Promo Pack 2',
    ]);
    expect(difficulty).toBeGreaterThanOrEqual(5);
    expect(difficulty).toBeLessThanOrEqual(8);
  });
});
