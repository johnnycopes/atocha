import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '@atocha/core/ui';
import { ROUTES } from '@atocha/globetrotter/shared/data-access';
import { IconComponent, fadeIn } from '@atocha/globetrotter/shared/ui';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, IconComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn],
})
export class HomeComponent {
  private _router = inject(Router);

  async onClick(): Promise<void> {
    await this._router.navigate([ROUTES.learn]);
  }
}
