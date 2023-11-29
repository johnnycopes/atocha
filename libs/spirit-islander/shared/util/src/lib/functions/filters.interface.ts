import { Expansion } from '../types';

export interface Filters<TName extends string> {
  expansions?: readonly Expansion[];
  names?: readonly TName[];
}
