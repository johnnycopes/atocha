import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlannerService } from '@atocha/menu-matriarch/planner/data-access';
import { Route } from '@atocha/menu-matriarch/shared/util';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[app-header]',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  Route: typeof Route = Route;
  plannerRoute$ = this._plannerService.route$;

  constructor(private _plannerService: PlannerService) {}
}
