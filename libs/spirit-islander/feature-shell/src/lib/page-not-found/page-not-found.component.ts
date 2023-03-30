import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ButtonComponent } from '@atocha/core/ui';
import { PageComponent } from '@atocha/spirit-islander/ui';
import { Route } from '@atocha/spirit-islander/util';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [ButtonComponent, CommonModule, PageComponent],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  constructor(private _router: Router) {}

  async onClick(): Promise<void> {
    await this._router.navigate([Route.Home]);
  }
}
