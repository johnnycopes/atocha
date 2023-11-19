import {
  ADVERSARIES,
  AdversaryLevel,
  MAPS,
  SCENARIOS,
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
  const maps = MAPS.filter(({ name }) => mapNames.includes(name));
  const scenarios = SCENARIOS.filter(({ name }) =>
    scenarioNames.includes(name)
  );
  const adversaryLevels = ADVERSARIES.reduce<AdversaryLevel[]>(
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
