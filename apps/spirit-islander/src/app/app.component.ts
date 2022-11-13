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
  createMapsModel,
  createScenariosModel,
  createSpiritsModel,
  GameSetup,
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
  _state = new State<AppState>({
    page: Page.Config,
    config: {
      expansions: [],
      players: 1,
      difficultyRange: [0, 1],
      spiritNames: createSpiritsModel(),
      mapNames: createMapsModel(),
      boardNames: createBoardsModel(),
      scenarioNames: createScenariosModel(),
      adversaryNamesAndIds: createAdversariesModel(),
    },
    validCombos: undefined,
    gameSetup: undefined,
  });

  vm$ = this._state.get();
  Page: typeof Page = Page;
}
