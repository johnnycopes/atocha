import type { DifficultyOption } from '../game/difficulty';
import { Map, MapName } from '../game/maps';
import { Scenario, ScenarioName } from '../game/scenarios';
import { AdversaryLevel, AdversaryLevelName } from '../game/adversaries';
import { getDifficulty } from '../game/get-difficulty';
import { ComboAnalyzer } from './combo-analyzer';
import type { Config } from './config.interface';
import { Options } from '../game/options';

const comboAnalyzer = new ComboAnalyzer<
  DifficultyOption<MapName | AdversaryLevelName | ScenarioName>
>();

const options = new Options();

export function getValidCombos(
  config: Config
): [Map, AdversaryLevel, Scenario][] {
  const { mapNames, scenarioNames, adversaryLevelIds } = config;
  const maps = options.maps.filter((map) => mapNames.includes(map.name));
  const scenarios = options.scenarios.filter((scenario) =>
    scenarioNames.includes(scenario.name)
  );
  const adversaries = options.adversaries.reduce<AdversaryLevel[]>(
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
