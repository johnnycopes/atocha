import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlannerService } from '@atocha/menu-matriarch/planner/data-access';
import { ROUTES } from '@atocha/menu-matriarch/shared/data-access-routing';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[app-header]',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private _plannerService = inject(PlannerService);

  readonly ROUTES = ROUTES;
  plannerRoute$ = this._plannerService.route$;
}
