import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from '@atocha/core/ui';
import { EmptyViewPlaceholderComponent } from '@atocha/menu-matriarch/shared/ui-generic';

@Component({
  standalone: true,
  selector: 'app-page-not-found',
  imports: [ButtonComponent, EmptyViewPlaceholderComponent, RouterModule],
  templateUrl: './page-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}
