import { Config } from '@atocha/spirit-islander/config/util';
import { GameSetup } from '@atocha/spirit-islander/game-setup/util';
import { Settings } from '@atocha/spirit-islander/settings/util';

export interface AppState {
  config: Config;
  gameSetup: GameSetup | undefined;
  settings: Settings;
}
