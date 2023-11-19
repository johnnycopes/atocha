import {
  ExpansionName,
  Players,
  Difficulty,
  Spirit,
  Map,
  Board,
  Scenario,
  AdversaryLevel,
} from '@atocha/spirit-islander/shared/util';

/**
 * Collection of options chosen before play that
 * influence how to set up a game of Spirit Island
 */
export interface GameSetup {
  expansions: readonly ExpansionName[];
  players: Players;
  difficulty: Difficulty;
  spirits: readonly Spirit[];
  map: Map;
  boards: readonly Board[];
  scenario: Scenario;
  adversaryLevel: AdversaryLevel;
}
