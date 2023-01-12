import {
  AdversaryLevelId,
  AdversaryName,
  BalancedBoardName,
  Config,
  Difficulty,
  ExpansionName,
  MapName,
  Players,
  ScenarioName,
  SpiritName,
} from '@atocha/spirit-islander/util';

export interface ConfigFormModel {
  expansions: ExpansionName[];
  players: Players;
  difficultyRange: Difficulty[];
  spiritNames: SpiritName[];
  mapNames: MapName[];
  boardNames: BalancedBoardName[];
  scenarioNames: ScenarioName[];
  adversaryNamesAndIds: (AdversaryName | AdversaryLevelId)[];
}

export function modelToConfig(model: ConfigFormModel): Config {
  const {
    expansions,
    players,
    difficultyRange,
    spiritNames,
    mapNames,
    boardNames,
    scenarioNames,
    adversaryNamesAndIds,
  } = model;

  return {
    expansions,
    players,
    difficultyRange,
    spiritNames,
    mapNames,
    boardNames,
    scenarioNames,
    adversaryNamesAndIds,
  };
}
