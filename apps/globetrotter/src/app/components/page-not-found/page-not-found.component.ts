import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { fadeInAnimation } from '@atocha/ui-globetrotter';
import { ERoute } from '@models/enums/route.enum';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  async onHomeClick(): Promise<void> {
    await this.router.navigate([ERoute.home]);
  }
}
