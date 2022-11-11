import { Injectable } from '@angular/core';

import { State } from '@atocha/core/util';
import {
  Config,
  createAdversariesModel,
  createBoardsModel,
  createMapsModel,
  createScenariosModel,
  createSpiritsModel,
} from '@atocha/spirit-islander/util';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _config = new State<Config>({
    expansions: [],
    players: 1,
    difficultyRange: [0, 1],
    spiritNames: createSpiritsModel(),
    mapNames: createMapsModel(),
    boardNames: createBoardsModel(),
    scenarioNames: createScenariosModel(),
    adversaryNamesAndIds: createAdversariesModel(),
  });

  config$ = this._config.get();
}
