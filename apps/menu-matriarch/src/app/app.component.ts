import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ErrorService } from '@services/error.service';
import { RouterService } from '@services/router.service';

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
    private _routerService: RouterService,
  ) { }
}
