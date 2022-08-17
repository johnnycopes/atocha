import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ErrorService, LoaderService } from '@atocha/globetrotter/data-access';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  loading$ = this._loaderService.global$;
  error$ = this._errorService.global$;

  constructor(
    private _loaderService: LoaderService,
    private _errorService: ErrorService
  ) {}
}
