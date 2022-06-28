import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AnimatedComponent } from '@atocha/ui-core';
import { positionAnimation } from '@atocha/ui-globetrotter';
import { Route } from '@atocha/types-globetrotter';

interface INavigationLink {
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
export class NavigationComponent extends AnimatedComponent implements OnInit {
  position = 'navigation';
  home: INavigationLink;
  links: INavigationLink[];

  ngOnInit(): void {
    this.home = {
      name: 'Home',
      icon: 'Globetrotter',
      route: Route.home,
      exactPathMatch: true,
    };
    this.links = [
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
}
