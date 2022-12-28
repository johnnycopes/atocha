import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first } from 'rxjs';

import { State } from '@atocha/core/util';
import {
  ConfigComponent,
  ConfigDetails,
} from '@atocha/spirit-islander/feature-config';
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
  ExpansionName,
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
  _expansions: ExpansionName[] = [
    'Horizons',
    'Jagged Earth',
    'Branch & Claw',
    'Promo Pack 1',
    'Promo Pack 2',
  ];
  _config: Config = {
    expansions: this._expansions,
    players: 6,
    difficultyRange: [0, 8],
    spiritNames: createSpiritsModel(this._expansions),
    mapNames: createMapsModel(['Horizons']),
    boardNames: createBoardsModel(this._expansions),
    scenarioNames: createScenariosModel(this._expansions),
    adversaryNamesAndIds: createAdversariesModel(this._expansions),
  };
  _state = new State<AppState>({
    page: Page.Config,
    config: this._config,
    validCombos: undefined,
    gameSetup: createGameSetup(this._config, getValidCombos(this._config)),
  });

  vm$ = this._state.get();
  Page: typeof Page = Page;

  onEdit(): void {
    this._state.updateProp('page', Page.Config);
  }

  onGenerate({ config, validCombos }: ConfigDetails): void {
    this._state.updateProp('config', config);
    this._state.updateProp('validCombos', validCombos);
    this._state.updateProp('gameSetup', createGameSetup(config, validCombos));
    this._state.updateProp('page', Page.GameSetup);
  }

  onRegenerate(): void {
    this._state
      .get()
      .pipe(first())
      .subscribe(({ config, validCombos }) =>
        this._state.updateProp(
          'gameSetup',
          createGameSetup(config, validCombos ?? [])
        )
      );
  }
}
