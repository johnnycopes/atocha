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
  if (!expansions) {
    return options;
  }
  names;

  return options.filter((item) => {
    if (item.expansion) {
      return expansions.includes(item.expansion);
    } else {
      return true;
    }
  });
}
