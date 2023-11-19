import {
  AdversaryLevel,
  AdversaryLevelName,
  Difficulty,
  DifficultyOption,
  ExpansionName,
  Map,
  MapName,
  Options,
  Scenario,
  ScenarioName,
} from '@atocha/spirit-islander/shared/util';
import { ComboAnalyzer } from './combo-analyzer';

const comboAnalyzer = new ComboAnalyzer<
  DifficultyOption<MapName | AdversaryLevelName | ScenarioName>
>();

export function getPossibleCombos({
  expansions,
  maps,
  adversaryLevels,
  scenarios,
  difficultyRange,
}: {
  expansions: readonly ExpansionName[];
  maps: readonly Map[];
  adversaryLevels: readonly AdversaryLevel[];
  scenarios: readonly Scenario[];
  difficultyRange: readonly Difficulty[];
}) {
  const [min, max] = difficultyRange;
  return comboAnalyzer.getPossibleCombos(
    [maps, adversaryLevels, scenarios],
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
