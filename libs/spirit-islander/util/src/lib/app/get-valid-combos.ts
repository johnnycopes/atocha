import type { DifficultyOption } from '../game/difficulty';
import { MAPS, Map, MapName } from '../game/maps';
import { SCENARIOS, Scenario, ScenarioName } from '../game/scenarios';
import {
  ADVERSARIES,
  AdversaryLevel,
  AdversaryLevelName,
} from '../game/adversaries';
import { getDifficulty } from '../game/get-difficulty';
import { ComboAnalyzer } from './combo-analyzer';
import type { Config } from './config.interface';

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
