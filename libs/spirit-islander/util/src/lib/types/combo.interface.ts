import type { Map } from '../data/maps';
import type { AdversaryLevel } from '../data/adversaries';
import type { Scenario } from '../data/scenarios';

/**
 * A valid combination of game setup options that
 * together add up to a given level of `Difficulty`
 */
export type Combo = [Map, AdversaryLevel, Scenario];
