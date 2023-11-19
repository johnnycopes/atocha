import { ParamMap } from '@angular/router';

import { Config } from '@atocha/spirit-islander/config/util';

type ConfigQueryParams = Required<{
  [Property in keyof Config]: string;
}>;

export function mapConfigToParams(config: Config): ConfigQueryParams {
  return {
    expansions: JSON.stringify(config.expansions),
    players: JSON.stringify(config.players),
    difficultyRange: JSON.stringify(config.difficultyRange),
    spiritNames: JSON.stringify(config.spiritNames),
    mapNames: JSON.stringify(config.mapNames),
    boardNames: JSON.stringify(config.boardNames),
    scenarioNames: JSON.stringify(config.scenarioNames),
    adversaryLevelIds: JSON.stringify(config.adversaryLevelIds),
  };
}

export function mapParamsToConfig(params: ParamMap): Config {
  return {
    expansions: JSON.parse(params.get('expansions') ?? ''),
    players: JSON.parse(params.get('players') ?? ''),
    difficultyRange: JSON.parse(params.get('difficultyRange') ?? ''),
    spiritNames: JSON.parse(params.get('spiritNames') ?? ''),
    mapNames: JSON.parse(params.get('mapNames') ?? ''),
    boardNames: JSON.parse(params.get('boardNames') ?? ''),
    scenarioNames: JSON.parse(params.get('scenarioNames') ?? ''),
    adversaryLevelIds: JSON.parse(params.get('adversaryLevelIds') ?? ''),
  };
}
