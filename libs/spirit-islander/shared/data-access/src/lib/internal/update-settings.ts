import { Settings } from '@atocha/spirit-islander/settings/util';
import { AppState } from './app-state.interface';

export function updateSettings(
  changes: Partial<Settings>,
  state: Readonly<AppState>
): Readonly<AppState> {
  return {
    ...state,
    settings: {
      ...state.settings,
      ...changes,
    },
  };
}
