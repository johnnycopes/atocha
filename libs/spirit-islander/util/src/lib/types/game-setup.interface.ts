import type { Players } from './game/players';
import type { Difficulty } from './game/difficulty';
import type { Spirit } from '../data/spirits';
import type { ExpansionName } from './game/expansions';
import type { AdversaryLevel } from './game/adversaries';
import type { Scenario } from '../data/scenarios';
import type { Map } from '../data/maps';
import type { Board } from '../data/boards';

/**
 * Collection of options chosen before play that
 * influence how to set up a game of Spirit Island
 */
export interface GameSetup {
  expansions: ExpansionName[];
  players: Players;
  difficulty: Difficulty;
  spirits: Spirit[];
  map: Map;
  boards: Board[];
  scenario: Scenario;
  adversaryLevel: AdversaryLevel;
}
