import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first } from 'rxjs';

import {
  RouterService,
  StateService,
} from '@atocha/spirit-islander/shared/data-access';
import { Config } from '@atocha/spirit-islander/config/util';
import { ConfigFormComponent } from './config-form/config-form.component';

@Component({
    selector: 'app-config',
    imports: [CommonModule, ConfigFormComponent],
    template: `
    <app-config-form
      *ngIf="config$ | async as config"
      [config]="config"
      (generate)="onGenerate($event)"
    ></app-config-form>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigComponent {
  config$ = this._stateService.config$.pipe(first());

  constructor(
    private _routerService: RouterService,
    private _stateService: StateService
  ) {}

  onGenerate(config: Config): void {
    this._routerService.navigateToGameSetup(config);
  }
}
