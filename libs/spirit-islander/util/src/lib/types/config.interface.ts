import type { Players } from './models/game/players';
import type { Difficulty } from './models/game/difficulty';
import type { MapName } from './models/game/maps';
import type { BalancedBoardName } from './models/game/board';
import type { ExpansionName } from './models/game/expansions';
import type { SpiritName } from './models/game/spirits';
import type {
  AdversaryName,
  AdversaryLevelId,
} from './models/game/adversaries';
import type { ScenarioName } from './models/game/scenarios';

/**
 * Collection of selected options that a user either
 * wants or would be willing to have in a `IGameSetup`
 */
export interface Config {
  expansions: ExpansionName[];
  players: Players;
  difficultyRange: Difficulty[];
  spiritNames: SpiritName[];
  mapNames: MapName[];
  boardNames: BalancedBoardName[];
  scenarioNames: ScenarioName[];
  adversaryNamesAndIds: (AdversaryName | AdversaryLevelId)[];
}
