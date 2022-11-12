import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExternalLinkDirective } from '@atocha/core/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[app-header]',
  standalone: true,
  imports: [CommonModule, ExternalLinkDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
