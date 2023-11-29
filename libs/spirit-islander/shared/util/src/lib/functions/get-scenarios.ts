import { SCENARIOS } from '../data';
import { Expansion, Scenario, ScenarioName } from '../types';
import { getOptions } from './get-options';

export function getScenarios(
  expansions?: readonly Expansion[]
): readonly Scenario[] {
  return getOptions<ScenarioName, Scenario>(SCENARIOS, { expansions });
}
