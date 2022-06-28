import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Route } from '@atocha/types-globetrotter';
import { fadeInAnimation } from '@atocha/ui-globetrotter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class HomeComponent {
  constructor(private _router: Router) {}

  async onClick(): Promise<void> {
    await this._router.navigate([Route.learn]);
  }
}
