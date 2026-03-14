import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ErrorService,
  LoadingService,
} from '@atocha/menu-matriarch/shared/data-access-routing';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private _errorService = inject(ErrorService);
  private _loadingService = inject(LoadingService);

  error$ = this._errorService.errors$;
  loading$ = this._loadingService.loading$;
}
