import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  ROUTES,
  RouterService,
} from '@atocha/spirit-islander/shared/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[app-header]',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private _routerService = inject(RouterService);

  readonly ROUTES = ROUTES;
  configParams$ = this._routerService.configParams$;
}
