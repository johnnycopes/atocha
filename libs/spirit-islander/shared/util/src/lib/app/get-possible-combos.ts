import { AdversaryLevel, AdversaryLevelName } from '../game/adversaries';
import { Difficulty } from '../game/difficulty';
import { Map, MapName } from '../game/maps';
import { DifficultyOption } from '../game/option';
import { Options } from '../game/options';
import { Scenario, ScenarioName } from '../game/scenarios';
import { ExpansionName } from '../game/expansions';
import { ComboAnalyzer } from './combo-analyzer';

const comboAnalyzer = new ComboAnalyzer<
  DifficultyOption<MapName | AdversaryLevelName | ScenarioName>
>();

export function getPossibleCombos({
  expansions,
  maps,
  adversaries,
  scenarios,
  difficultyRange,
}: {
  expansions: ExpansionName[];
  maps: Map[];
  adversaries: AdversaryLevel[];
  scenarios: Scenario[];
  difficultyRange: Difficulty[];
}) {
  const [min, max] = difficultyRange;
  return comboAnalyzer.getPossibleCombos(
    [maps, adversaries, scenarios],
    (options) => {
      const difficulty = options.reduce(
        (accum, option) =>
          accum + Options.getDifficulty(option.difficulty, expansions),
        0
      );
      return difficulty >= min && difficulty <= max;
    }
  );
}
