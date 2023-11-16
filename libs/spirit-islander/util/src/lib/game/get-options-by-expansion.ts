import type { ExpansionName, ExpansionOption } from './expansions';

/**
 * Get options from base game and specified expansions
 * @param options
 * Array of options that may be from an expansion
 * @param expansions
 * Array of desired expansion names used to filter returned options
 * @returns
 * Array of options from base game and specified expansions
 */
export function getOptionsByExpansion<
  TName extends string,
  TOption extends ExpansionOption<TName>
>(
  options: readonly TOption[],
  expansions: readonly ExpansionName[]
): readonly TOption[] {
  return options.filter((item) => {
    if (item.expansion) {
      return expansions.includes(item.expansion);
    } else {
      return true;
    }
  });
}
