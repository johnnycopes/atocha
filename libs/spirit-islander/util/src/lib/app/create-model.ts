import { ADVERSARIES, AdversaryLevelId } from '../game/adversaries';
import { BOARDS, BalancedBoardName } from '../game/boards';
import { MAPS, MapName } from '../game/maps';
import { SCENARIOS, ScenarioName } from '../game/scenarios';
import { SPIRITS, SpiritName } from '../game/spirits';
import type { ExpansionName, ExpansionOption } from '../game/expansions';
import { getOptionsByExpansion } from '../game/get-options-by-expansion';

export function createSpiritsModel(
  expansions: readonly ExpansionName[] = []
): readonly SpiritName[] {
  return createModel(SPIRITS, expansions);
}

export function createMapsModel(
  expansions: readonly ExpansionName[] = []
): readonly MapName[] {
  return createModel(MAPS, expansions);
}

export function createBoardsModel(
  expansions: readonly ExpansionName[] = []
): readonly BalancedBoardName[] {
  return createModel(BOARDS, expansions);
}

export function createScenariosModel(
  expansions: readonly ExpansionName[] = []
): readonly ScenarioName[] {
  return createModel(SCENARIOS, expansions);
}

export function createAdversariesModel(
  expansions: readonly ExpansionName[] = []
): readonly AdversaryLevelId[] {
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
  expansions: readonly ExpansionName[]
): readonly TName[] {
  return getOptionsByExpansion(options, expansions).map(
    (option) => option.name
  );
}
