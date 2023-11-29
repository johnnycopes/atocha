import { Expansion, ExpansionOption } from '../types';

export interface Filters<TName extends string> {
  expansions?: readonly Expansion[];
  names?: readonly TName[];
}

export function getOptions<
  TName extends string,
  TOption extends ExpansionOption<TName>
>(
  options: readonly TOption[],
  { expansions, names }: Filters<TName> = {}
): readonly TOption[] {
  if (expansions && names) {
    throw new Error(
      'Options can only be filtered by expansions OR names (not both at once)'
    );
  }

  if (expansions && !names) {
    return options.filter((item) => {
      if (item.expansion) {
        return expansions.includes(item.expansion);
      } else {
        return true;
      }
    });
  }

  if (names && !expansions) {
    return options.filter((item) => names.includes(item.name));
  }

  return options;
}
