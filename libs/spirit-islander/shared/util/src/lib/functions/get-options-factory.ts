import { ExpansionOption, Filters } from '../types';
import { getOptions } from './get-options';

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
  return getOptions;
}
