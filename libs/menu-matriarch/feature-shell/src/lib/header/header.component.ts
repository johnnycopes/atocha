import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Route } from '@atocha/menu-matriarch/util';
import { RouterService } from '@atocha/menu-matriarch/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  Route: typeof Route = Route;
  plannerRoute$ = this._routerService.getPlannerRoute();

  constructor(private _routerService: RouterService) {}
}
