import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Route } from '@atocha/globetrotter/types';
import { fadeInAnimation } from '@atocha/globetrotter/ui';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class PageNotFoundComponent {
  constructor(private _router: Router) {}

  async onHomeClick(): Promise<void> {
    await this._router.navigate([Route.home]);
  }
}
