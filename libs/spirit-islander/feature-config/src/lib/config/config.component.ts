import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first, map } from 'rxjs';

import { AppStateService } from '@atocha/spirit-islander/data-access';
import {
  ConfigDetails,
  ConfigFormComponent,
} from '../config-form/config-form.component';

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
  config$ = this._appStateService.state$.pipe(
    first(),
    map(({ config }) => config)
  );

  constructor(private _appStateService: AppStateService) {}

  onGenerate({ config, validCombos }: ConfigDetails): void {
    this._appStateService.generate(config, validCombos);
  }
}
