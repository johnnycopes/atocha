import { Expansion, ExpansionOption, Filters } from '../types';

export type GetOptions<
  TName extends string,
  TOption extends ExpansionOption<TName>
> = ({ expansions, names }: Filters<TName>) => readonly TOption[];

export function getOptionsFactory<
  TName extends string,
  TOption extends ExpansionOption<TName>
>(
  options: readonly TOption[],
  {
    filterNames = (options, names) => {
      const filteredOptions: TOption[] = [];

      for (const name of names) {
        const foundOption = options.find((option) => option.name === name);
        if (foundOption) {
          filteredOptions.push(foundOption);
        }
      }

      return filteredOptions;
    },
    filterExpansions = (options, expansions) => {
      return options.filter((item) => {
        if (item.expansion) {
          return expansions.includes(item.expansion);
        } else {
          return true;
        }
      });
    },
  }: {
    filterNames?: (
      options: readonly TOption[],
      names: readonly TName[]
    ) => readonly TOption[];
    filterExpansions?: (
      options: readonly TOption[],
      expansions: readonly Expansion[]
    ) => readonly TOption[];
  } = {}
): GetOptions<TName, TOption> {
  return function getOptions({
    expansions,
    names,
  }: Filters<TName> = {}): readonly TOption[] {
    if (expansions && names) {
      throw new Error(
        'Options can only be filtered by expansions OR names (not both at once)'
      );
    }

    if (expansions && !names) {
      return filterExpansions(options, expansions);
    }

    if (names && !expansions) {
      return filterNames(options, names);
    }

    return options;
  };
}
