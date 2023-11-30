import { ExpansionOption, Filters } from '../types';

export type GetOptions<
  TName extends string,
  TOption extends ExpansionOption<TName>
> = (
  options: readonly TOption[],
  { expansions, names }: Filters<TName>
) => readonly TOption[];

export function getOptionsFactory<
  TName extends string,
  TOption extends ExpansionOption<TName>
>(): GetOptions<TName, TOption> {
  return function getOptions(
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
      const filteredOptions: TOption[] = [];

      for (const name of names) {
        const foundOption = options.find((option) => option.name === name);
        if (foundOption) {
          filteredOptions.push(foundOption);
        }
      }

      return filteredOptions;
    }

    return options;
  };
}
