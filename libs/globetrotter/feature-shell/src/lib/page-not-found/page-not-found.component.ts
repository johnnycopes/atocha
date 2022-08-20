import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Route } from '@atocha/globetrotter/util';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  constructor(private _router: Router) {}

  async onHomeClick(): Promise<void> {
    await this._router.navigate([Route.home]);
  }
}
