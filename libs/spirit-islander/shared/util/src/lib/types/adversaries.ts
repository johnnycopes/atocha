import { ADVERSARIES } from '../data';
import { ExpansionOption, DifficultyOption } from './option';

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
