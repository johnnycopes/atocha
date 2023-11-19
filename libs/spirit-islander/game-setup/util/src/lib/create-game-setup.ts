import {
  Difficulty,
  SPIRITS,
  getDifficulty,
  getOptionsByName,
} from '@atocha/spirit-islander/shared/util';
import { Config, getValidCombos } from '@atocha/spirit-islander/config/util';
import { GameSetup } from './game-setup.interface';
import { selectRandom } from './internal/select-random';
import { selectBoards } from './internal/select-boards';

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
