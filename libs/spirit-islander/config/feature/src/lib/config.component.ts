import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first, map } from 'rxjs';

import { Config } from '@atocha/spirit-islander/util';
import { AppFacadeService } from '@atocha/spirit-islander/shared/data-access';
import { ConfigFormComponent } from './config-form/config-form.component';

@Component({
  standalone: true,
  selector: 'app-config',
  imports: [CommonModule, ConfigFormComponent],
  template: `
    <app-config-form
      *ngIf="config$ | async as config"
      [config]="config"
      (generate)="onGenerate($event)"
    ></app-config-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigComponent {
  config$ = this._appFacadeService.state$.pipe(
    first(),
    map(({ config }) => config)
  );

  constructor(private _appFacadeService: AppFacadeService) {}

  onGenerate(config: Config): void {
    this._appFacadeService.navigateToGameSetup(config);
  }
}
