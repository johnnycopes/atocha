import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AnimatedComponent } from '@atocha/core/ui';
import { positionAnimation } from '@atocha/globetrotter/ui';
import { Route } from '@atocha/globetrotter/types';

interface NavigationLink {
  name: string;
  route: string;
  icon?: string;
  exactPathMatch: boolean;
}

@Component({
  selector: 'app-navigation',
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
}
