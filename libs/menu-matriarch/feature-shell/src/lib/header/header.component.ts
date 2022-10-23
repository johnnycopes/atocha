import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PlannerService } from '@atocha/menu-matriarch/data-access';

import { Route } from '@atocha/menu-matriarch/util';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  Route: typeof Route = Route;
  plannerRoute$ = this._plannerService.route$;

  constructor(private _plannerService: PlannerService) {}
}
