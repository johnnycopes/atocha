import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

import {
  RouterService,
  StateService,
} from '@atocha/spirit-islander/shared/data-access';
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
  gameSetup$ = this._stateService.gameSetup$;

  constructor(
    private _route: ActivatedRoute,
    private _routerService: RouterService,
    private _stateService: StateService
  ) {}

  ngOnInit(): void {
    this._route.queryParamMap
      .pipe(first())
      .subscribe((queryParams) =>
        this._routerService.processParams(queryParams)
      );
  }

  onEdit(): void {
    this._routerService.navigateToConfig();
  }

  onRegenerate(): void {
    this._stateService.updateGameSetup();
  }
}
