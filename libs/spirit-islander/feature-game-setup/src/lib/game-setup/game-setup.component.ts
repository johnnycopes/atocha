import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs';

import {
  AppStateService,
  mapParamMapToConfig,
} from '@atocha/spirit-islander/data-access';
import { createGameSetup, getValidCombos } from '@atocha/spirit-islander/util';
import { GameSetupOutputComponent } from '../game-setup-output/game-setup-output.component';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [CommonModule, GameSetupOutputComponent],
  template: `
    <app-game-setup-output
      *ngIf="gameSetup$ | async as gameSetup"
      [setup]="gameSetup"
      (edit)="onEdit()"
      (regenerate)="onRegenerate()"
    ></app-game-setup-output>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSetupComponent {
  gameSetup$ = this._route.queryParamMap.pipe(
    first(),
    map((queryParams) => {
      const config = mapParamMapToConfig(queryParams);
      return createGameSetup(config, getValidCombos(config));
    })
  );

  constructor(
    private _appStateService: AppStateService,
    private _route: ActivatedRoute
  ) {}

  onEdit(): void {
    this._appStateService.edit();
  }

  onRegenerate(): void {
    this._appStateService.regenerate();
  }
}
