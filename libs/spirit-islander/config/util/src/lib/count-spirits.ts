import { SpiritName, groupSpirits } from '@atocha/spirit-islander/shared/util';

export function countSpirits(names: readonly SpiritName[]): number {
  let count = 0;

  for (const [group, spirits] of Object.entries(groupSpirits(names))) {
    count += group !== 'General' && spirits.length > 0 ? 1 : spirits.length;
  }

  return count;
}
