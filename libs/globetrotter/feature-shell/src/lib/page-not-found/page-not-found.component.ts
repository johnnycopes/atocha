import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '@atocha/core/ui';
import { ErrorComponent } from '@atocha/globetrotter/ui';
import { Route } from '@atocha/globetrotter/util';

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
    await this._router.navigate([Route.home]);
  }
}
