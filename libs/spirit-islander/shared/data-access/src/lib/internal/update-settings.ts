import { Settings } from '@atocha/spirit-islander/settings/util';
import { AppState } from './app-state.interface';
import { getBoards, getNames } from '@atocha/spirit-islander/shared/util';

export function updateSettings(
  changes: Partial<Settings>,
  state: Readonly<AppState>
): Readonly<AppState> {
  if (changes.allowBEAndDFBoards === false) {
    return {
      ...state,
      config: {
        ...state.config,
        boardNames: getNames(
          getBoards({ expansions: state.config.expansions })
        ),
      },
      settings: {
        ...state.settings,
        ...changes,
      },
    };
  }

  return {
    ...state,
    settings: {
      ...state.settings,
      ...changes,
    },
  };
}
