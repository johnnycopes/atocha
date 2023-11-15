import type { Option } from './option';

/**
 * Get options that have specified names
 * @param options
 * Array of options
 * @param names
 * Array of names used to filter returned options
 * @returns
 * Array of options that have specified names
 */
export function getOptionsByName<
  TName extends string,
  TOption extends Option<TName>
>(options: readonly TOption[], names: readonly TName[]): readonly TOption[] {
  const filteredOptions: TOption[] = [];

  for (const name of names) {
    const foundOption = options.find((option) => option.name === name);
    if (foundOption) {
      filteredOptions.push(foundOption);
    }
  }

  return filteredOptions;
}
