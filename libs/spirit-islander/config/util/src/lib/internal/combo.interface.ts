import {
  Map,
  AdversaryLevel,
  Scenario,
} from '@atocha/spirit-islander/shared/util';

/**
 * A valid combination of game setup options that
 * together add up to a given level of `Difficulty`
 */
export type Combos = readonly Combo[];
type Combo = readonly [Map, AdversaryLevel, Scenario];
