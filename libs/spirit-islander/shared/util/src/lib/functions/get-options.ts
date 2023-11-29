import { Expansion, ExpansionOption } from '../types';

interface Filters {
  expansions?: readonly Expansion[];
  names?: readonly string[];
}

export function getOptions<
  TName extends string,
  TOption extends ExpansionOption<TName>
>(
  options: readonly TOption[],
  { expansions, names }: Filters = {}
): readonly TOption[] {
  if (expansions && names) {
    throw new Error(
      'Options can only be filtered by expansions OR names (not both at once)'
    );
  } else if (!expansions && !names) {
    return options;
  }

  if (expansions) {
    return options.filter((item) => {
      if (item.expansion) {
        return expansions.includes(item.expansion);
      } else {
        return true;
      }
    });
  }

  if (names) {
    return options.filter((item) => names.includes(item.name));
  }

  return [];
}
