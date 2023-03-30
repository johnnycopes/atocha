import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs';

import {
  AppFacadeService,
  AppStateService,
} from '@atocha/spirit-islander/data-access';
import { GameSetupOutputComponent } from './game-setup-output/game-setup-output.component';

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
export class GameSetupComponent implements OnInit {
  gameSetup$ = this._appStateService.state$.pipe(
    map(({ gameSetup }) => gameSetup)
  );

  constructor(
    private _appFacadeService: AppFacadeService,
    private _appStateService: AppStateService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.queryParamMap
      .pipe(first())
      .subscribe((queryParams) =>
        this._appStateService.processParams(queryParams)
      );
  }

  onEdit(): void {
    this._appFacadeService.navigateToConfig();
  }

  onRegenerate(): void {
    this._appStateService.createNewGameSetup();
  }
}
