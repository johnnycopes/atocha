import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    @if (config$ | async; as config) {
    <app-config-form
      [config]="config"
      (generate)="onGenerate($event)"
    ></app-config-form>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigComponent {
  private _routerService = inject(RouterService);
  private _stateService = inject(StateService);

  config$ = this._stateService.config$.pipe(first());

  onGenerate(config: Config): void {
    this._routerService.navigateToGameSetup(config);
  }
}
