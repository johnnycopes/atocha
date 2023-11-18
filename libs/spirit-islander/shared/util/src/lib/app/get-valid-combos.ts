import { Map } from '../game/maps';
import { Scenario } from '../game/scenarios';
import { AdversaryLevel } from '../game/adversaries';
import { Options } from '../game/options';
import type { Config } from './config.interface';
import { getPossibleCombos } from './get-possible-combos';

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
  const maps = Options.allMaps.filter((map) => mapNames.includes(map.name));
  const scenarios = Options.allScenarios.filter((scenario) =>
    scenarioNames.includes(scenario.name)
  );
  const adversaries = Options.allAdversaries.reduce<AdversaryLevel[]>(
    (levels, adversary) => {
      const adversaryLevels = adversary.levels.filter((level) =>
        adversaryLevelIds.includes(level.id)
      );
      levels.push(...adversaryLevels);
      return levels;
    },
    []
  );

  return getPossibleCombos({
    expansions,
    maps,
    adversaries,
    scenarios,
    difficultyRange,
  });
}
