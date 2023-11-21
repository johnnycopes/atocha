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
  const spirits: Spirit[] = [];
  const aspectfulSpirits: Record<AspectsSpiritName, Spirit[]> = {
    "Lightning's Swift Strike": [],
    'River Surges in Sunlight': [],
    'Shadows Flicker Like Flame': [],
    'Vital Strength of the Earth': [],
  };

  for (const spirit of getOptionsByName(SPIRITS, names)) {
    if (isPossibleAspect(spirit.name)) {
      aspectfulSpirits[spirit.name].push(spirit);
    } else if (spirit.derivesFrom && isPossibleAspect(spirit.derivesFrom)) {
      aspectfulSpirits[spirit.derivesFrom].push(spirit);
    } else {
      spirits.push(spirit);
    }
  }

  const finalSpirits: Spirit[] = [];
  for (const spirits of Object.values(aspectfulSpirits)) {
    if (spirits.length > 0) {
      finalSpirits.push(...selectRandom(spirits));
    }
  }
  finalSpirits.push(...spirits);

  return selectRandom(finalSpirits, players);
}
