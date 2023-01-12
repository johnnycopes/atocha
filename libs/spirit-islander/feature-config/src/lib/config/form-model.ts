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
  maps: MapName[];
  boards: BalancedBoardName[];
  scenarios: ScenarioName[];
  adversaries: (AdversaryName | AdversaryLevelId)[];
}

export function modelToConfig(model: ConfigFormModel): Config {
  const {
    expansions,
    players,
    difficultyRange,
    spiritNames,
    maps,
    boards,
    scenarios,
    adversaries,
  } = model;

  return {
    expansions,
    players,
    difficultyRange,
    spiritNames,
    mapNames: maps,
    boardNames: boards,
    scenarioNames: scenarios,
    adversaryNamesAndIds: adversaries,
  };
}
