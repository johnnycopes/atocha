import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  ErrorService,
  LoadingService,
} from '@atocha/menu-matriarch/data-access';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  error$ = this._errorService.errors$;
  loading$ = this._loadingService.loading$;

  constructor(
    private _errorService: ErrorService,
    private _loadingService: LoadingService
  ) {}
}
