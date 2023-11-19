import {
  EXPANSIONS as EXPANSIONS_DATA,
  DIFFICULTIES as DIFFICULTIES_DATA,
  PLAYERS as PLAYERS_DATA,
  SPIRITS as SPIRITS_DATA,
  BOARDS as BOARDS_DATA,
  MAPS as MAPS_DATA,
  SCENARIOS as SCENARIOS_DATA,
  ADVERSARIES as ADVERSARIES_DATA,
} from './data';
import {
  ExpansionName,
  Difficulty,
  Players,
  Spirit,
  Map,
  Board,
  Scenario,
  Adversary,
} from './types';

export const EXPANSIONS: readonly ExpansionName[] = EXPANSIONS_DATA;
export const DIFFICULTIES: readonly Difficulty[] = DIFFICULTIES_DATA;
export const PLAYERS: readonly Players[] = PLAYERS_DATA;
export const SPIRITS: readonly Spirit[] = SPIRITS_DATA;
export const BOARDS: readonly Board[] = BOARDS_DATA;
export const MAPS: readonly Map[] = MAPS_DATA;
export const SCENARIOS: readonly Scenario[] = SCENARIOS_DATA;
export const ADVERSARIES: readonly Adversary[] = ADVERSARIES_DATA;
