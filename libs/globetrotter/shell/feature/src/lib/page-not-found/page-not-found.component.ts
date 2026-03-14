import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '@atocha/core/ui';
import { ROUTES } from '@atocha/globetrotter/shared/data-access';
import { ErrorComponent } from '@atocha/globetrotter/shared/ui';

@Component({
  selector: 'app-page-not-found',
  imports: [ButtonComponent, ErrorComponent],
  templateUrl: './page-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  private _router = inject(Router);

  async onHomeClick(): Promise<void> {
    await this._router.navigate([ROUTES.home]);
  }
}
