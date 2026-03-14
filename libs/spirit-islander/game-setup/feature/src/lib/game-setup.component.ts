import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

import {
  RouterService,
  StateService,
} from '@atocha/spirit-islander/shared/data-access';
import { GameSetupOutputComponent } from './game-setup-output/game-setup-output.component';

@Component({
  selector: 'app-game-setup',
  imports: [CommonModule, GameSetupOutputComponent],
  template: `
    @if (gameSetup$ | async; as gameSetup) {
    <app-game-setup-output
      [setup]="gameSetup"
      (edit)="onEdit()"
      (regenerate)="onRegenerate()"
    ></app-game-setup-output>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSetupComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _routerService = inject(RouterService);
  private _stateService = inject(StateService);

  gameSetup$ = this._stateService.gameSetup$;

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
