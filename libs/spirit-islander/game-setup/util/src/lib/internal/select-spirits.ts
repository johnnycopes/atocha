import {
  AspectsSpiritName,
  Players,
  SPIRITS,
  Spirit,
  SpiritName,
  getOptionsByName,
  isPossibleAspect,
} from '@atocha/spirit-islander/shared/util';
import { selectRandom } from './select-random';

export function selectSpirits(
  names: readonly SpiritName[],
  players: Players
): readonly Spirit[] {
  const spiritNames: SpiritName[] = [];
  const aspectfulSpiritNames: Record<AspectsSpiritName, SpiritName[]> = {
    "Lightning's Swift Strike": [],
    'River Surges in Sunlight': [],
    'Shadows Flicker Like Flame': [],
    'Vital Strength of the Earth': [],
  };

  for (const { name, derivesFrom } of getOptionsByName(SPIRITS, names)) {
    if (isPossibleAspect(name)) {
      aspectfulSpiritNames[name].push(name);
    } else if (derivesFrom && isPossibleAspect(derivesFrom)) {
      aspectfulSpiritNames[derivesFrom].push(name);
    } else {
      spiritNames.push(name);
    }
  }

  const finalNames: SpiritName[] = [];
  for (const names of Object.values(aspectfulSpiritNames)) {
    if (names.length > 0) {
      finalNames.push(...selectRandom(names));
    }
  }
  finalNames.push(...spiritNames);

  const randomNames = selectRandom(finalNames, players);
  return getOptionsByName(SPIRITS, randomNames);
}
