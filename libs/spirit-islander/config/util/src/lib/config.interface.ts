import {
  Expansion,
  Players,
  Difficulty,
  SpiritName,
  MapName,
  BalancedBoardName,
  ScenarioName,
  AdversaryLevelId,
} from '@atocha/spirit-islander/shared/util';

/**
 * Collection of selected options that a user either
 * wants or would be willing to have in a `IGameSetup`
 */
export interface Config {
  expansions: readonly Expansion[];
  players: Players;
  difficultyRange: readonly Difficulty[];
  spiritNames: readonly SpiritName[];
  mapNames: readonly MapName[];
  boardNames: readonly BalancedBoardName[];
  scenarioNames: readonly ScenarioName[];
  adversaryLevelIds: readonly AdversaryLevelId[];
}
