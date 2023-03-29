import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppStateService } from '@atocha/spirit-islander/data-access';
import {
  Config,
  createGameSetup,
  GameSetup,
  getValidCombos,
} from '@atocha/spirit-islander/util';
import { GameSetupOutputComponent } from '../game-setup-output/game-setup-output.component';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [CommonModule, GameSetupOutputComponent],
  template: `
    <app-game-setup-output
      [setup]="gameSetup"
      (edit)="onEdit()"
      (regenerate)="onRegenerate()"
    ></app-game-setup-output>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSetupComponent {
  private _mockConfig: Config = {
    expansions: [],
    players: 2,
    difficultyRange: [0, 8],
    spiritNames: [
      'A Spread of Rampant Green',
      'Bringer of Dreams and Nightmares',
    ],
    mapNames: ['Balanced'],
    boardNames: ['A', 'B', 'C'],
    scenarioNames: ['A Diversity of Spirits', 'Blitz'],
    adversaryLevelIds: ['none', 'bp-0', 'en-4'],
  };
  gameSetup: GameSetup = createGameSetup(
    this._mockConfig,
    getValidCombos(this._mockConfig)
  );
  constructor(private _appStateService: AppStateService) {}

  onEdit(): void {
    this._appStateService.edit();
  }

  onRegenerate(): void {
    this._appStateService.regenerate();
  }
}
