import { Config } from '@atocha/spirit-islander/config/util';
import { createGameSetup } from './create-game-setup';
import {
  getAdversaries,
  getAdversaryLevelIds,
  getBoards,
  getExpansions,
  getMaps,
  getNames,
  getScenarios,
  getSpirits,
} from '@atocha/spirit-islander/shared/util';
import { createDefaultSettings } from '@atocha/spirit-islander/settings/util';

describe('createGameSetup', () => {
  it('returns a randomly-generated game setup', () => {
    const mockConfig: Config = {
      expansions: getExpansions(),
      players: 4,
      difficultyRange: [5, 8],
      spiritNames: getNames(getSpirits()),
      mapNames: getNames(getMaps()),
      boardNames: getNames(getBoards()),
      scenarioNames: getNames(getScenarios()),
      adversaryLevelIds: getAdversaryLevelIds(getAdversaries()),
    };
    const { boards, spirits, expansions, difficulty } = createGameSetup(
      mockConfig,
      createDefaultSettings()
    );

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
