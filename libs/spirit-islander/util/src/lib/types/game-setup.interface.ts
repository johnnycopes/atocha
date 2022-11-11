import type { Players } from './models/game/players';
import type { Difficulty } from './models/game/difficulty';
import type { Spirit } from './models/game/spirits';
import type { ExpansionName } from './models/game/expansions';
import type { AdversaryLevel } from './models/game/adversaries';
import type { Scenario } from './models/game/scenarios';
import type { Map } from './models/game/maps';
import type { Board } from './models/game/board';

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
