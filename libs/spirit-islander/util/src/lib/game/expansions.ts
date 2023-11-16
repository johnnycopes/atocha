import { EXPANSIONS } from './data/expansions';
import type { Option } from './option';

export type ExpansionName = (typeof EXPANSIONS)[number];

export interface ExpansionOption<TName extends string> extends Option<TName> {
  expansion?: ExpansionName;
}
