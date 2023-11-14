import type { DifficultyOption } from '../types/game/difficulty';
import type { ExpansionOption } from '../types/game/expansions';

export interface Scenario
  extends DifficultyOption<ScenarioName>,
    ExpansionOption<ScenarioName> {}

export type ScenarioName =
  | 'No Scenario'
  | 'A Diversity of Spirits'
  | 'Blitz'
  | 'Dahan Insurrection'
  | 'Despicable Theft'
  | 'Elemental Invocation'
  | "Guard the Isle's Heart"
  | 'Powers Long Forgotten'
  | 'Rituals of Destroying Flame'
  | 'Rituals of Terror'
  | 'Second Wave'
  | 'The Great River'
  | 'Varied Terrains'
  | 'Ward the Shores';

export const SCENARIOS: readonly Scenario[] = [
  {
    name: 'No Scenario',
    difficulty: 0,
  },
  {
    name: 'Blitz',
    difficulty: 0,
  },
  {
    name: "Guard the Isle's Heart",
    difficulty: 0,
  },
  {
    name: 'Second Wave',
    difficulty: 0,
    expansion: 'Branch & Claw',
  },
  {
    name: 'A Diversity of Spirits',
    difficulty: 0,
    expansion: 'Promo Pack 2',
  },
  {
    name: 'Powers Long Forgotten',
    difficulty: 1,
    expansion: 'Branch & Claw',
  },
  {
    name: 'Elemental Invocation',
    difficulty: 0,
    expansion: 'Jagged Earth',
  },
  {
    name: 'Varied Terrains',
    difficulty: 2,
    expansion: 'Promo Pack 2',
  },
  {
    name: 'Despicable Theft',
    difficulty: 2,
    expansion: 'Jagged Earth',
  },
  {
    name: 'Ward the Shores',
    difficulty: 2,
    expansion: 'Branch & Claw',
  },
  {
    name: 'Rituals of Destroying Flame',
    difficulty: 3,
    expansion: 'Branch & Claw',
  },
  {
    name: 'Rituals of Terror',
    difficulty: 3,
  },
  {
    name: 'The Great River',
    difficulty: 3,
    expansion: 'Jagged Earth',
  },
  {
    name: 'Dahan Insurrection',
    difficulty: 4,
  },
];
