import { Config } from '@atocha/spirit-islander/util';

type ConfigQueryParams = Required<{
  [Property in keyof Config]: string;
}>;

export function mapConfigToQueryParams(config: Config): ConfigQueryParams {
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
