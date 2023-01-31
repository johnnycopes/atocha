import type { Option } from './option';

export const EXPANSIONS = [
  'Branch & Claw',
  'Horizons',
  'Jagged Earth',
  'Promo Pack 1',
  'Promo Pack 2',
] as const;

export type ExpansionName = typeof EXPANSIONS[number];

export interface ExpansionOption<TName extends string> extends Option<TName> {
  expansion?: ExpansionName;
}
