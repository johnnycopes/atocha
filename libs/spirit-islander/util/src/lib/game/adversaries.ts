import { ADVERSARIES } from './data';
import type { DifficultyOption } from './difficulty';
import type { ExpansionOption } from './expansions';

export interface Adversary extends ExpansionOption<AdversaryName> {
  levels: readonly AdversaryLevel[];
}

export type AdversaryName = (typeof ADVERSARIES)[number]['name'];

export type AdversaryLevelName =
  (typeof ADVERSARIES)[number]['levels'][number]['name'];

export type AdversaryLevelId =
  (typeof ADVERSARIES)[number]['levels'][number]['id'];

export interface AdversaryLevel extends DifficultyOption<AdversaryLevelName> {
  id: AdversaryLevelId;
}
