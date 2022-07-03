import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { ErrorService, RouterService } from '@atocha/globetrotter/data-access';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  loading$ = this._routerService.state.pipe(
    map(({ loading }) => loading)
  );
  error$ = this._errorService.errors.pipe(map(({ global }) => !!global));

  constructor(
    private _routerService: RouterService,
    private _errorService: ErrorService
  ) {}
}
