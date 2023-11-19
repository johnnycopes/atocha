import { Option } from '../types';

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
