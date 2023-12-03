import { Difficulty, getDifficulty } from '@atocha/spirit-islander/shared/util';
import { Config, getValidCombos } from '@atocha/spirit-islander/config/util';
import { Settings } from '@atocha/spirit-islander/settings/util';
import { GameSetup } from './game-setup.interface';
import { selectBoards } from './internal/select-boards';
import { selectRandom } from './internal/select-random';
import { selectSpirits } from './internal/select-spirits';

export function createGameSetup(
  config: Config,
  { randomizedThematicBoards }: Settings
): GameSetup {
  const { players, expansions, spiritNames, boardNames } = config;
  const validCombos = getValidCombos(config);

  // Randomly choose a combination of a map, adversary, and scenario and determine the total difficulty
  const [selectedMap, selectedAdversaryLevel, selectedScenario] =
    selectRandom(validCombos)[0];
  const difficulty = (getDifficulty(selectedMap.difficulty, expansions) +
    getDifficulty(selectedAdversaryLevel.difficulty, expansions) +
    getDifficulty(selectedScenario.difficulty, expansions)) as Difficulty;

  // Randomly select spirits and boards
  const selectedSpirits = selectSpirits(spiritNames, players);
  const selectedBoards = selectBoards(selectedMap.name, players, boardNames, {
    randomizedThematicBoards,
  });

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
