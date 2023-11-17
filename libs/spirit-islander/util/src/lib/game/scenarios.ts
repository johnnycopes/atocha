import { SCENARIOS } from './data';
import type { DifficultyOption } from './difficulty';
import type { ExpansionOption } from './expansions';

export interface Scenario
  extends DifficultyOption<ScenarioName>,
    ExpansionOption<ScenarioName> {}

export type ScenarioName = (typeof SCENARIOS)[number]['name'];
