import { ADVERSARIES, AdversaryLevelId } from '../game/adversaries';
import { BOARDS, BalancedBoardName } from '../game/boards';
import { MAPS, MapName } from '../game/maps';
import { SCENARIOS, ScenarioName } from '../game/scenarios';
import { SPIRITS, SpiritName } from '../game/spirits';
import type { ExpansionName, ExpansionOption } from '../game/expansions';
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
