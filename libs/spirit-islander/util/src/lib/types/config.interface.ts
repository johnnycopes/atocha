import type { Players } from '../data/players';
import type { Difficulty } from '../data/difficulty';
import type { MapName } from '../data/maps';
import type { BalancedBoardName } from '../data/boards';
import type { ExpansionName } from '../data/expansions';
import type { SpiritName } from '../data/spirits';
import type { AdversaryLevelId } from '../data/adversaries';
import type { ScenarioName } from '../data/scenarios';

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
  adversaryLevelIds: AdversaryLevelId[];
}
