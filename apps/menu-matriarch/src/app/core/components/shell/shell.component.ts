import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { routerTransition } from './router-transition';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerTransition],
})
export class ShellComponent {
  public getState(outlet: RouterOutlet): string | undefined {
    return outlet?.activatedRouteData?.state;
  }
}
