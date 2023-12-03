import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first, map } from 'rxjs';

import { AppFacadeService } from '@atocha/spirit-islander/shared/data-access';
import { Config } from '@atocha/spirit-islander/config/util';
import { ConfigFormComponent } from './config-form/config-form.component';

@Component({
  standalone: true,
  selector: 'app-config',
  imports: [CommonModule, ConfigFormComponent],
  templateUrl: './config.component.html',
  styleUrls: [`./config.component.scss`],
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
