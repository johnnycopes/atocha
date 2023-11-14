import type { DifficultyOption } from '../data/difficulty';
import type { Config } from '../types/config.interface';
import { MAPS, Map, MapName } from '../data/maps';
import { SCENARIOS, Scenario, ScenarioName } from '../data/scenarios';
import {
  ADVERSARIES,
  AdversaryLevel,
  AdversaryLevelName,
} from '../data/adversaries';
import { ComboAnalyzer } from './internal/combo-analyzer';
import { getDifficulty } from './get-difficulty';

const comboAnalyzer = new ComboAnalyzer<
  DifficultyOption<MapName | AdversaryLevelName | ScenarioName>
>();

export function getValidCombos(
  config: Config
): [Map, AdversaryLevel, Scenario][] {
  const { mapNames, scenarioNames, adversaryLevelIds } = config;
  const maps = MAPS.filter((map) => mapNames.includes(map.name));
  const scenarios = SCENARIOS.filter((scenario) =>
    scenarioNames.includes(scenario.name)
  );
  const adversaries = ADVERSARIES.reduce<AdversaryLevel[]>(
    (levels, adversary) => {
      const adversaryLevels = adversary.levels.filter((level) =>
        adversaryLevelIds.includes(level.id)
      );
      levels.push(...adversaryLevels);
      return levels;
    },
    []
  );

  return comboAnalyzer.getPossibleCombos(
    [maps, adversaries, scenarios],
    (options) => {
      const [min, max] = config.difficultyRange;
      const difficulty = options.reduce(
        (accum, option) =>
          accum + getDifficulty(option.difficulty, config.expansions),
        0
      );
      return difficulty >= min && difficulty <= max;
    }
  );
}
