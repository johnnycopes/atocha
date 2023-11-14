import { ADVERSARIES, AdversaryLevelId } from '../game/adversaries';
import { BOARDS } from '../game/boards';
import { EXPANSIONS } from '../game/expansions';
import { MAPS } from '../game/maps';
import { SCENARIOS } from '../game/scenarios';
import { SPIRITS } from '../game/spirits';
import type { Config } from './config.interface';
import { createGameSetup } from './create-game-setup';

describe('createGameSetup', () => {
  it('returns a randomly-generated game setup', () => {
    const mockConfig: Config = {
      expansions: [...EXPANSIONS],
      players: 4,
      difficultyRange: [5, 8],
      spiritNames: SPIRITS.map((spirit) => spirit.name),
      mapNames: MAPS.map((map) => map.name),
      boardNames: BOARDS.map((board) => board.name),
      scenarioNames: SCENARIOS.map((scenario) => scenario.name),
      adversaryLevelIds: ADVERSARIES.reduce<AdversaryLevelId[]>(
        (model, adversary) => {
          adversary.levels.forEach((level) => model.push(level.id));
          return model;
        },
        []
      ),
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
