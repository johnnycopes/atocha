import { SCENARIOS } from '../data';
import { Filters, Scenario, ScenarioName } from '../types';
import { getOptions } from './get-options';

export function getScenarios(filters: Filters<ScenarioName> = {}) {
  return getOptions<ScenarioName, Scenario>(SCENARIOS, filters);
}
