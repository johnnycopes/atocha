import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { fadeInAnimation } from '@atocha/ui-globetrotter';
import { ERoute } from '@models/enums/route.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class HomeComponent {
  constructor(private router: Router) {}

  async onClick(): Promise<void> {
    await this.router.navigate([ERoute.learn]);
  }
}
