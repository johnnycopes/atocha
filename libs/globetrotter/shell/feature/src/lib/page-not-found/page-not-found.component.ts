import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '@atocha/core/ui';
import { ROUTES } from '@atocha/globetrotter/data-access';
import { ErrorComponent } from '@atocha/globetrotter/shared/ui';

@Component({
  standalone: true,
  selector: 'app-page-not-found',
  imports: [ButtonComponent, ErrorComponent],
  templateUrl: './page-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  constructor(private _router: Router) {}

  async onHomeClick(): Promise<void> {
    await this._router.navigate([ROUTES.home]);
  }
}
