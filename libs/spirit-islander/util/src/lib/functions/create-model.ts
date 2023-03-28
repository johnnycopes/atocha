import { ADVERSARIES } from '../data/adversaries';
import { BOARDS } from '../data/boards';
import { MAPS } from '../data/maps';
import { SCENARIOS } from '../data/scenarios';
import { SPIRITS } from '../data/spirits';
import type {
  AdversaryLevelId,
  AdversaryName,
} from '../types/game/adversaries';
import type { BalancedBoardName } from '../types/game/board';
import type { ExpansionName, ExpansionOption } from '../types/game/expansions';
import type { MapName } from '../types/game/maps';
import type { ScenarioName } from '../types/game/scenarios';
import type { SpiritName } from '../types/game/spirits';
import { getOptionsByExpansion } from './get-options';

export function createSpiritsModel(
  expansions: ExpansionName[] = []
): SpiritName[] {
  return createModel(SPIRITS, expansions);
}

export function createMapsModel(expansions: ExpansionName[] = []): MapName[] {
  return createModel(MAPS, expansions);
}

export function createBoardsModel(
  expansions: ExpansionName[] = []
): BalancedBoardName[] {
  return createModel(BOARDS, expansions);
}

export function createScenariosModel(
  expansions: ExpansionName[] = []
): ScenarioName[] {
  return createModel(SCENARIOS, expansions);
}

export function createAdversariesModel(
  expansions: ExpansionName[] = []
): (AdversaryName | AdversaryLevelId)[] {
  return getOptionsByExpansion(ADVERSARIES, expansions).reduce(
    (adversaries, adversary) => {
      adversary.levels.forEach((level) => {
        adversaries.push(level.id);
      });
      return adversaries;
    },
    ['none'] as AdversaryLevelId[]
  );
}

function createModel<TName extends string>(
  options: ExpansionOption<TName>[],
  expansions: ExpansionName[]
): TName[] {
  return getOptionsByExpansion(options, expansions).map(
    (option) => option.name
  );
}
