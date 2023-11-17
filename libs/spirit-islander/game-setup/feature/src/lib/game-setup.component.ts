import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs';

import { AppFacadeService } from '@atocha/spirit-islander/shared/data-access';
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
  gameSetup$ = this._appFacadeService.state$.pipe(
    map(({ gameSetup }) => gameSetup)
  );

  constructor(
    private _appFacadeService: AppFacadeService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.queryParamMap
      .pipe(first())
      .subscribe((queryParams) =>
        this._appFacadeService.processParams(queryParams)
      );
  }

  onEdit(): void {
    this._appFacadeService.navigateToConfig();
  }

  onRegenerate(): void {
    this._appFacadeService.refreshGameSetup();
  }
}
