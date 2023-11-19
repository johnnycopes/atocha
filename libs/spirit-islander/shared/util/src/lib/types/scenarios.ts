import { SCENARIOS } from '../data';
import { DifficultyOption, ExpansionOption } from './option';

export interface Scenario
  extends DifficultyOption<ScenarioName>,
    ExpansionOption<ScenarioName> {}

export type ScenarioName = (typeof SCENARIOS)[number]['name'];
