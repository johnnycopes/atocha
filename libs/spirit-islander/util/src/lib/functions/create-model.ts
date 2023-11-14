import { ADVERSARIES } from '../data/adversaries';
import { BOARDS } from '../data/boards';
import { MAPS } from '../data/maps';
import { SCENARIOS, ScenarioName } from '../data/scenarios';
import { SPIRITS, SpiritName } from '../data/spirits';
import type { AdversaryLevelId } from '../types/game/adversaries';
import type { BalancedBoardName } from '../data/boards';
import type { ExpansionName, ExpansionOption } from '../types/game/expansions';
import type { MapName } from '../types/game/maps';
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
): AdversaryLevelId[] {
  return getOptionsByExpansion(ADVERSARIES, expansions).reduce<
    AdversaryLevelId[]
  >((adversaries, adversary) => {
    adversary.levels.forEach((level) => {
      adversaries.push(level.id);
    });
    return adversaries;
  }, []);
}

function createModel<TName extends string>(
  options: readonly ExpansionOption<TName>[],
  expansions: ExpansionName[]
): TName[] {
  return getOptionsByExpansion(options, expansions).map(
    (option) => option.name
  );
}
