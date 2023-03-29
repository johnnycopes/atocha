import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '@atocha/core/ui';
import { PageComponent } from '@atocha/spirit-islander/ui';
import { Router } from '@angular/router';

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

  onClick(): void {
    this._router.navigate(['']);
  }
}
