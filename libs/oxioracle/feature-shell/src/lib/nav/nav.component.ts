import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ExternalLinkDirective } from '@atocha/core/ui';
import { ROUTES } from '@atocha/oxioracle/data-access';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[app-nav]',
  imports: [
    CommonModule,
    ExternalLinkDirective,
    RouterLink,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  readonly readmeLink =
    'https://github.com/johnnycopes/atocha/blob/oxio/apps/oxioracle/README.md';
  readonly tableLink = ROUTES.table;
  readonly chartsLink = ROUTES.charts;
  readonly formLink = ROUTES.form;
}
