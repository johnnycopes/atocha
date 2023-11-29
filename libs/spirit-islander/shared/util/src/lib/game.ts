import {
  EXPANSIONS as EXPANSIONS_DATA,
  DIFFICULTIES as DIFFICULTIES_DATA,
  PLAYERS as PLAYERS_DATA,
  MAPS as MAPS_DATA,
  SCENARIOS as SCENARIOS_DATA,
  ADVERSARIES as ADVERSARIES_DATA,
} from './data';
import {
  Expansion,
  Difficulty,
  Players,
  Map,
  Scenario,
  Adversary,
} from './types';

export const EXPANSIONS: readonly Expansion[] = EXPANSIONS_DATA;
export const DIFFICULTIES: readonly Difficulty[] = DIFFICULTIES_DATA;
export const PLAYERS: readonly Players[] = PLAYERS_DATA;
export const MAPS: readonly Map[] = MAPS_DATA;
export const SCENARIOS: readonly Scenario[] = SCENARIOS_DATA;
export const ADVERSARIES: readonly Adversary[] = ADVERSARIES_DATA;
