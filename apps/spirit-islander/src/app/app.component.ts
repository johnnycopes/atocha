import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { routerTransition } from '@atocha/core/ui';
import {
  FooterComponent,
  HeaderComponent,
} from '@atocha/spirit-islander/feature-shell';
import { PageComponent } from '@atocha/spirit-islander/ui';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [FooterComponent, HeaderComponent, PageComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerTransition],
})
export class AppComponent {
  getState(outlet: RouterOutlet): string | undefined {
    return outlet.activatedRouteData['state'];
  }
}
