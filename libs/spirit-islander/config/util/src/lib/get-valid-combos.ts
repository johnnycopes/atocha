import {
  AdversaryLevel,
  getAdversaries,
  getMaps,
  getScenarios,
} from '@atocha/spirit-islander/shared/util';
import { Config } from './config.interface';
import { getPossibleCombos } from './internal/get-possible-combos';
import { Combos } from './internal/combo.interface';

export function getValidCombos(config: Config): Combos {
  const {
    expansions,
    mapNames,
    scenarioNames,
    adversaryLevelIds,
    difficultyRange,
  } = config;
  const maps = getMaps().filter(({ name }) => mapNames.includes(name));
  const scenarios = getScenarios().filter(({ name }) =>
    scenarioNames.includes(name)
  );
  const adversaryLevels = getAdversaries().reduce<AdversaryLevel[]>(
    (accum, { levels }) => {
      const adversaryLevels = levels.filter(({ id }) =>
        adversaryLevelIds.includes(id)
      );
      accum.push(...adversaryLevels);
      return accum;
    },
    []
  );

  return getPossibleCombos({
    expansions,
    maps,
    adversaryLevels,
    scenarios,
    difficultyRange,
  });
}
