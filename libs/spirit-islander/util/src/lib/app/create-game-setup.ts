import type { GameSetup } from './game-setup.interface';
import type { Difficulty } from '../game/difficulty';
import { getValidCombos } from './get-valid-combos';
import { getDifficulty } from '../game/get-difficulty';
import { Options } from '../game/options';
import type { Config } from './config.interface';
import { selectBoards } from './select-boards';
import { selectRandom } from './select-random';

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
  const selectedSpirits = Options.getOptionsByName(
    Options.allSpirits,
    randomSpiritNames
  );
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
