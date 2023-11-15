import type { Players } from '../game/players';
import type { Difficulty } from '../game/difficulty';
import type { MapName } from '../game/maps';
import type { BalancedBoardName } from '../game/boards';
import type { ExpansionName } from '../game/expansions';
import type { SpiritName } from '../game/spirits';
import type { AdversaryLevelId } from '../game/adversaries';
import type { ScenarioName } from '../game/scenarios';

/**
 * Collection of selected options that a user either
 * wants or would be willing to have in a `IGameSetup`
 */
export interface Config {
  expansions: readonly ExpansionName[];
  players: Players;
  difficultyRange: Difficulty[];
  spiritNames: readonly SpiritName[];
  mapNames: readonly MapName[];
  boardNames: readonly BalancedBoardName[];
  scenarioNames: readonly ScenarioName[];
  adversaryLevelIds: readonly AdversaryLevelId[];
}
