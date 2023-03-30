import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '@atocha/core/ui';
import { AppRoutingService } from '@atocha/spirit-islander/data-access';
import { PageComponent } from '@atocha/spirit-islander/ui';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [ButtonComponent, CommonModule, PageComponent],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  constructor(private _appRoutingService: AppRoutingService) {}

  async onClick(): Promise<void> {
    await this._appRoutingService.navigateToHome();
  }
}
