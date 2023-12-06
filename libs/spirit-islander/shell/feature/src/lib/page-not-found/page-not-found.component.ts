import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '@atocha/core/ui';
import { RouterService } from '@atocha/spirit-islander/shared/data-access';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  constructor(private _routerService: RouterService) {}

  async onClick(): Promise<void> {
    await this._routerService.navigateToHome();
  }
}
