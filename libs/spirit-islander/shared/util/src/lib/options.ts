import {
  ADVERSARIES,
  BOARDS,
  DIFFICULTIES,
  EXPANSIONS,
  MAPS,
  PLAYERS,
  SCENARIOS,
  SPIRITS,
} from './data';
import { Adversary, AdversaryLevelId } from './types/adversaries';
import { Board } from './types/boards';
import { Difficulty } from './types/difficulty';
import { ExpansionName } from './types/expansions';
import { Map } from './types/maps';
import { Players } from './types/players';
import { Scenario } from './types/scenarios';
import { Spirit } from './types/spirits';
import { ExpansionOption, Option } from './types/option';

export class Options {
  static allExpansions: readonly ExpansionName[] = EXPANSIONS;
  static allDifficulties: readonly Difficulty[] = DIFFICULTIES;
  static allPlayers: readonly Players[] = PLAYERS;
  static allSpirits: readonly Spirit[] = SPIRITS;
  static allBoards: readonly Board[] = BOARDS;
  static allMaps: readonly Map[] = MAPS;
  static allScenarios: readonly Scenario[] = SCENARIOS;
  static allAdversaries: readonly Adversary[] = ADVERSARIES;

  static getDifficulty(
    difficulty:
      | Difficulty
      | ((expansions: readonly ExpansionName[]) => Difficulty),
    expansions: readonly ExpansionName[]
  ): Difficulty {
    return typeof difficulty === 'function'
      ? difficulty(expansions)
      : difficulty;
  }

  static getNames<TName extends string>(
    options: readonly Option<TName>[]
  ): TName[] {
    return options.map(({ name }) => name);
  }

  static getAdversaryLevelIds(
    adversaries: readonly Adversary[]
  ): AdversaryLevelId[] {
    return adversaries.reduce<AdversaryLevelId[]>((model, adversary) => {
      adversary.levels.forEach((level) => model.push(level.id));
      return model;
    }, []);
  }

  static getOptionsByName<TName extends string, TOption extends Option<TName>>(
    options: readonly TOption[],
    names: readonly TName[]
  ): readonly TOption[] {
    const filteredOptions: TOption[] = [];

    for (const name of names) {
      const foundOption = options.find((option) => option.name === name);
      if (foundOption) {
        filteredOptions.push(foundOption);
      }
    }

    return filteredOptions;
  }

  static getOptionsByExpansion<
    TName extends string,
    TOption extends ExpansionOption<TName>
  >(
    options: readonly TOption[],
    expansions: readonly ExpansionName[]
  ): readonly TOption[] {
    return options.filter((item) => {
      if (item.expansion) {
        return expansions.includes(item.expansion);
      } else {
        return true;
      }
    });
  }
}
