import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { routerTransition } from '@atocha/core/ui';
import { NavComponent } from '../nav/nav.component';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [CommonModule, NavComponent, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerTransition],
})
export class ShellComponent {
  getState(outlet: RouterOutlet): string | undefined {
    return outlet.activatedRouteData['state'];
  }
}
