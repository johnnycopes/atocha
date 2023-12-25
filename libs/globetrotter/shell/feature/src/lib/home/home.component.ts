import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '@atocha/core/ui';
import { ROUTES } from '@atocha/globetrotter/shared/data-access';
import { IconComponent, fadeInAnimation } from '@atocha/globetrotter/shared/ui';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ButtonComponent, IconComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class HomeComponent {
  constructor(private _router: Router) {}

  async onClick(): Promise<void> {
    await this._router.navigate([ROUTES.learn]);
  }
}
