import { SCENARIOS } from '../data';
import { Scenario, ScenarioName } from '../types';
import { Filters } from './filters.interface';
import { getOptions } from './get-options';

export function getScenarios(filters: Filters<ScenarioName> = {}) {
  return getOptions<ScenarioName, Scenario>(SCENARIOS, filters);
}
