import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  AnimatedComponent,
  ExternalLinkDirective,
  trackByFactory,
} from '@atocha/core/ui';
import { ROUTES } from '@atocha/globetrotter/shared/data-access';
import { IconComponent } from '@atocha/globetrotter/shared/ui';
import { positionAnimation } from './navigation';

interface NavigationLink {
  name: string;
  route: string;
  icon?: string;
  exactPathMatch: boolean;
}

@Component({
  standalone: true,
  selector: 'app-navigation',
  imports: [CommonModule, ExternalLinkDirective, IconComponent, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [positionAnimation],
})
export class NavigationComponent extends AnimatedComponent implements OnInit {
  position: 'offscreen' | 'onscreen' = 'offscreen';
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

  ngOnInit(): void {
    this.position = 'onscreen';
  }
}
