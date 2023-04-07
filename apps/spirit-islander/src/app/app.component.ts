import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { ConfigComponent } from '@atocha/spirit-islander/feature-config';
import { GameSetupComponent } from '@atocha/spirit-islander/feature-game-setup';
import {
  FooterComponent,
  HeaderComponent,
} from '@atocha/spirit-islander/feature-shell';
import { PageComponent } from '@atocha/spirit-islander/ui';
import { routerTransition } from './router-transition';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    ConfigComponent,
    FooterComponent,
    GameSetupComponent,
    HeaderComponent,
    PageComponent,
    RouterModule,
  ],
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
