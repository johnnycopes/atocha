import { Option } from '../types';

export function getNames<TName extends string>(
  options: readonly Option<TName>[]
): TName[] {
  return options.map(({ name }) => name);
}
