import { SCENARIOS } from '../data';
import { Filters, Scenario, ScenarioName } from '../types';
import { getOptionsFactory } from './get-options-factory';

const getOptions = getOptionsFactory<ScenarioName, Scenario>(SCENARIOS);

export function getScenarios(filters: Filters<ScenarioName> = {}) {
  return getOptions(filters);
}
