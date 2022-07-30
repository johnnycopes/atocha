import { Component, ChangeDetectionStrategy } from '@angular/core';

import { environment } from '@env/environment';
import { Route } from '@models/route.enum';
import { RouterService } from '@services/router.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public Route: typeof Route = Route;
  public showDemo = !environment.production;
  public plannerRoute$ = this._routerService.getPlannerRoute();

  constructor(private _routerService: RouterService) { }
}
