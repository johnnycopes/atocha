import { SPIRITS } from '../game/spirits';
import type { Config } from '../app/config.interface';
import type { GameSetup } from '../app/game-setup.interface';
import type { Difficulty } from '../game/difficulty';
import { getValidCombos } from './get-valid-combos';
import { getOptionsByName } from '../game/get-options';
import { getDifficulty } from '../game/get-difficulty';
import { selectBoards } from '../app/select-boards';
import { selectRandom } from '../app/select-random';

export function createGameSetup(config: Config): GameSetup {
  const { players, expansions, spiritNames, boardNames } = config;
  const validCombos = getValidCombos(config);

  // Randomly choose a combination of a map, adversary, and scenario and determine the total difficulty
  const [selectedMap, selectedAdversaryLevel, selectedScenario] =
    selectRandom(validCombos)[0];
  const difficulty = (getDifficulty(selectedMap.difficulty, expansions) +
    getDifficulty(selectedAdversaryLevel.difficulty, expansions) +
    getDifficulty(selectedScenario.difficulty, expansions)) as Difficulty;

  // Randomly select spirits and boards
  const randomSpiritNames = selectRandom(spiritNames, players);
  const selectedSpirits = getOptionsByName(SPIRITS, randomSpiritNames);
  const selectedBoards = selectBoards(selectedMap.name, players, boardNames);

  return {
    players,
    difficulty,
    expansions,
    spirits: selectedSpirits,
    boards: selectedBoards,
    map: selectedMap,
    scenario: selectedScenario,
    adversaryLevel: selectedAdversaryLevel,
  };
}
