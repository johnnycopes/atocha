import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '@atocha/core/ui';
import { AppStateService } from '@atocha/spirit-islander/data-access';
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
  constructor(private _appStateService: AppStateService) {}

  async onClick(): Promise<void> {
    await this._appStateService.navigateToHome();
  }
}
