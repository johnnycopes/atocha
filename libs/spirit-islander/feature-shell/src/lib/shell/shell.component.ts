import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { routerTransition } from '@atocha/core/ui';
import { PageComponent } from '@atocha/spirit-islander/shared/ui';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [FooterComponent, HeaderComponent, PageComponent, RouterModule],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerTransition],
})
export class ShellComponent {
  getState(outlet: RouterOutlet): string | undefined {
    return outlet.activatedRouteData['state'];
  }
}
