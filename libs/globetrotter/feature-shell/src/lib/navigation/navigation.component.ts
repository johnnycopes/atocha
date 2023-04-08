import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnimatedComponent, trackByFactory } from '@atocha/core/ui';
import { IconComponent, positionAnimation } from '@atocha/globetrotter/ui';
import { Route } from '@atocha/globetrotter/util';

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
    route: Route.home,
    exactPathMatch: true,
  };
  links: NavigationLink[] = [
    {
      name: 'Explore',
      route: Route.explore,
      exactPathMatch: true,
    },
    {
      name: 'Learn',
      route: Route.learn,
      exactPathMatch: false,
    },
  ];
  readonly trackByFn = trackByFactory<NavigationLink>(({ name }) => name);
}
