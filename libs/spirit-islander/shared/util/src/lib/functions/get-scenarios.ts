import { SCENARIOS } from '../data';
import { Expansion, Scenario } from '../types';
import { getOptions } from './get-options';

export function getScenarios(expansions?: Expansion[]): readonly Scenario[] {
  return getOptions(SCENARIOS, expansions);
}
