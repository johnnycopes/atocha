import type { DifficultyOption } from '../types/game/difficulty';
import type { Config } from '../types/config.interface';
import type {
  AdversaryLevel,
  AdversaryLevelName,
} from '../types/game/adversaries';
import type { Map, MapName } from '../types/game/maps';
import type { Scenario, ScenarioName } from '../data/scenarios';
import { ADVERSARIES } from '../data/adversaries';
import { MAPS } from '../data/maps';
import { SCENARIOS } from '../data/scenarios';
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
