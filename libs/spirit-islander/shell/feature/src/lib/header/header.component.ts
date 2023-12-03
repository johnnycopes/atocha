import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExternalLinkDirective } from '@atocha/core/ui';
import {
  AppFacadeService,
  Route,
} from '@atocha/spirit-islander/shared/data-access';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { mapConfigToParams } from 'libs/spirit-islander/shared/data-access/src/lib/internal/url-mappers';
import { map, tap } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[app-header]',
  standalone: true,
  imports: [CommonModule, ExternalLinkDirective, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly Route: typeof Route = Route;
  config$ = this._appFacadeService.state$.pipe(
    map(({ config }) => mapConfigToParams(config)),
    tap(console.log)
  );

  constructor(private _appFacadeService: AppFacadeService) {}
}
