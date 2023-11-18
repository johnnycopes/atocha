import {
  Config,
  Difficulty,
  GameSetup,
  Options,
  getValidCombos,
  selectBoards,
  selectRandom,
} from '@atocha/spirit-islander/shared/util';

export function createGameSetup(config: Config): GameSetup {
  const { players, expansions, spiritNames, boardNames } = config;
  const validCombos = getValidCombos(config);

  // Randomly choose a combination of a map, adversary, and scenario and determine the total difficulty
  const [selectedMap, selectedAdversaryLevel, selectedScenario] =
    selectRandom(validCombos)[0];
  const difficulty = (Options.getDifficulty(
    selectedMap.difficulty,
    expansions
  ) +
    Options.getDifficulty(selectedAdversaryLevel.difficulty, expansions) +
    Options.getDifficulty(
      selectedScenario.difficulty,
      expansions
    )) as Difficulty;

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
