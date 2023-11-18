import {
  AdversaryLevel,
  Config,
  Map,
  Options,
  Scenario,
  getPossibleCombos,
} from '@atocha/spirit-islander/shared/util';

export function getValidCombos(
  config: Config
): readonly [Map, AdversaryLevel, Scenario][] {
  const {
    expansions,
    mapNames,
    scenarioNames,
    adversaryLevelIds,
    difficultyRange,
  } = config;
  const maps = Options.allMaps.filter(({ name }) => mapNames.includes(name));
  const scenarios = Options.allScenarios.filter(({ name }) =>
    scenarioNames.includes(name)
  );
  const adversaryLevels = Options.allAdversaries.reduce<AdversaryLevel[]>(
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
