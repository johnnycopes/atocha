import type { AdversaryLevelId } from '../game/adversaries';
import type { BalancedBoardName } from '../game/boards';
import type { MapName } from '../game/maps';
import type { ScenarioName } from '../game/scenarios';
import type { SpiritName } from '../game/spirits';
import type { ExpansionName, ExpansionOption } from '../game/expansions';
import { getOptionsByExpansion } from '../game/get-options-by-expansion';
import { Options } from '../game/options';

const { spirits, maps, boards, scenarios, adversaries } = new Options();

export function createSpiritsModel(
  expansions: readonly ExpansionName[] = []
): readonly SpiritName[] {
  return createModel(spirits, expansions);
}

export function createMapsModel(
  expansions: readonly ExpansionName[] = []
): readonly MapName[] {
  return createModel(maps, expansions);
}

export function createBoardsModel(
  expansions: readonly ExpansionName[] = []
): readonly BalancedBoardName[] {
  return createModel(boards, expansions);
}

export function createScenariosModel(
  expansions: readonly ExpansionName[] = []
): readonly ScenarioName[] {
  return createModel(scenarios, expansions);
}

export function createAdversariesModel(
  expansions: readonly ExpansionName[] = []
): readonly AdversaryLevelId[] {
  return getOptionsByExpansion(adversaries, expansions).reduce<
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
