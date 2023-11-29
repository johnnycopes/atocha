import { Expansion, ExpansionOption } from '../types';

export function getOptions<
  TName extends string,
  TOption extends ExpansionOption<TName>
>(
  options: readonly TOption[],
  expansions?: readonly Expansion[]
): readonly TOption[] {
  if (!expansions) {
    return options;
  }

  return options.filter((item) => {
    if (item.expansion) {
      return expansions.includes(item.expansion);
    } else {
      return true;
    }
  });
}
