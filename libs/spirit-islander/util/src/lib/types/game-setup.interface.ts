import type { Players } from '../data/players';
import type { Difficulty } from '../data/difficulty';
import type { Spirit } from '../data/spirits';
import type { ExpansionName } from '../data/expansions';
import { AdversaryLevel } from '../data/adversaries';
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
