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
  spirits: SpiritName[];
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
    spirits,
    maps,
    boards,
    scenarios,
    adversaries,
  } = model;

  return {
    players: players as Players,
    difficultyRange: difficultyRange as Difficulty[],
    expansions: expansions as ExpansionName[],
    spiritNames: spirits as SpiritName[],
    mapNames: maps as MapName[],
    boardNames: boards as BalancedBoardName[],
    scenarioNames: scenarios as ScenarioName[],
    adversaryNamesAndIds: adversaries as (AdversaryName | AdversaryLevelId)[],
  };
}
