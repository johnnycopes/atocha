import { SCENARIOS } from '../data';
import { Scenario, ScenarioName } from '../types';
import { getOptionsFactory } from './get-options-factory';

export const getScenarios = getOptionsFactory<ScenarioName, Scenario>(
  SCENARIOS
);
