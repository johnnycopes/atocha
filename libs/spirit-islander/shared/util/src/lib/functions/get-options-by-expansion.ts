import { Expansion, ExpansionOption } from '../types';

export function getOptionsByExpansion<
  TName extends string,
  TOption extends ExpansionOption<TName>
>(
  options: readonly TOption[],
  expansions: readonly Expansion[]
): readonly TOption[] {
  return options.filter((item) => {
    if (item.expansion) {
      return expansions.includes(item.expansion);
    } else {
      return true;
    }
  });
}
