import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { State } from '@atocha/core/util';
import { ConfigComponent } from '@atocha/spirit-islander/feature-config';
import { GameSetupComponent } from '@atocha/spirit-islander/feature-game-setup';
import {
  FooterComponent,
  HeaderComponent,
} from '@atocha/spirit-islander/feature-shell';
import {
  Combo,
  Config,
  createAdversariesModel,
  createBoardsModel,
  createGameSetup,
  createMapsModel,
  createScenariosModel,
  createSpiritsModel,
  GameSetup,
  getValidCombos,
  Page,
} from '@atocha/spirit-islander/util';

interface AppState {
  page: Page;
  config: Config;
  validCombos: Combo[] | undefined;
  gameSetup: GameSetup | undefined;
}

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    ConfigComponent,
    FooterComponent,
    GameSetupComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  _config: Config = {
    expansions: [],
    players: 1,
    difficultyRange: [0, 1],
    spiritNames: createSpiritsModel(),
    mapNames: createMapsModel(),
    boardNames: createBoardsModel(),
    scenarioNames: createScenariosModel(),
    adversaryNamesAndIds: createAdversariesModel(),
  };
  _state = new State<AppState>({
    page: Page.GameSetup,
    config: this._config,
    validCombos: undefined,
    gameSetup: createGameSetup(this._config, getValidCombos(this._config)),
  });

  vm$ = this._state.get();
  Page: typeof Page = Page;
}
