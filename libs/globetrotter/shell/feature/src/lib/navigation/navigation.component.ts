import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnimatedComponent, trackByFactory } from '@atocha/core/ui';
import { IconComponent, positionAnimation } from '@atocha/globetrotter/ui';
import { ROUTES } from '@atocha/globetrotter/data-access';

interface NavigationLink {
  name: string;
  route: string;
  icon?: string;
  exactPathMatch: boolean;
}

@Component({
  standalone: true,
  selector: 'app-navigation',
  imports: [CommonModule, IconComponent, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [positionAnimation],
})
export class NavigationComponent extends AnimatedComponent {
  position = 'navigation';
  home: NavigationLink = {
    name: 'Home',
    icon: 'Globetrotter',
    route: ROUTES.home,
    exactPathMatch: true,
  };
  links: NavigationLink[] = [
    {
      name: 'Explore',
      route: ROUTES.explore,
      exactPathMatch: true,
    },
    {
      name: 'Learn',
      route: ROUTES.learn,
      exactPathMatch: false,
    },
  ];
  readonly trackByFn = trackByFactory<NavigationLink>(({ name }) => name);
}
