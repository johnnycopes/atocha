import { SCENARIOS } from '../data';
import { ScenarioIdentifier } from './identitiers';
import { DifficultyOption, ExpansionOption } from './option';

export interface Scenario
  extends DifficultyOption<ScenarioName>,
    ExpansionOption<ScenarioName> {
  identifier?: ScenarioIdentifier;
}

export type ScenarioName = (typeof SCENARIOS)[number]['name'];
