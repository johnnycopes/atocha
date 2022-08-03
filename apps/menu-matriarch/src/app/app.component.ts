import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ErrorService, RouterService } from '@atocha/menu-matriarch/data-access';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public error$ = this._errorService.errors$;
  public loading$ = this._routerService.loading$;

  constructor(
    private _errorService: ErrorService,
    private _routerService: RouterService
  ) {}
}
