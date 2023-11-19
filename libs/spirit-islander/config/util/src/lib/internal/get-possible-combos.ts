import {
  AdversaryLevel,
  AdversaryLevelName,
  Difficulty,
  DifficultyOption,
  ExpansionName,
  Map,
  MapName,
  Scenario,
  ScenarioName,
  getDifficulty,
} from '@atocha/spirit-islander/shared/util';
import { ComboAnalyzer } from './combo-analyzer';
import { Combos } from './combo.interface';

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
}): Combos {
  const [min, max] = difficultyRange;
  return comboAnalyzer.getPossibleCombos(
    [maps, adversaryLevels, scenarios],
    (options) => {
      const difficulty = options.reduce(
        (accum, { difficulty }) =>
          accum + getDifficulty(difficulty, expansions),
        0
      );
      return min <= difficulty && difficulty <= max;
    }
  );
}
