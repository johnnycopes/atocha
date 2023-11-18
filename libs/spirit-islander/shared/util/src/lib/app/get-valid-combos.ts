import { Map } from '../game/maps';
import { Scenario } from '../game/scenarios';
import { AdversaryLevel } from '../game/adversaries';
import { Options } from '../game/options';
import type { Config } from './config.interface';
import { getPossibleCombos } from './get-possible-combos';

export function getValidCombos(
  config: Config
): [Map, AdversaryLevel, Scenario][] {
  const { mapNames, scenarioNames, adversaryLevelIds } = config;
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

  // Create mutable copies to satisfy ComboAnalyzer param types
  const expansions = config.expansions.slice();
  const difficultyRange = config.difficultyRange.slice();

  return getPossibleCombos({
    expansions,
    maps,
    adversaries,
    scenarios,
    difficultyRange,
  });
}
