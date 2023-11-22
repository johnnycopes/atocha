import {
  Players,
  Spirit,
  SpiritName,
  groupSpirits,
} from '@atocha/spirit-islander/shared/util';
import { selectRandom } from './select-random';

export function selectSpirits(
  names: readonly SpiritName[],
  players: Players
): readonly Spirit[] {
  const possibleSpirits: Spirit[] = [];

  for (const [group, spirits] of Object.entries(groupSpirits(names))) {
    if (group !== 'General' && spirits.length > 0) {
      possibleSpirits.push(...selectRandom(spirits));
    } else {
      possibleSpirits.push(...spirits);
    }
  }

  return selectRandom(possibleSpirits, players);
}
