import { Routes } from '@angular/router';

import {
  PageNotFoundComponent,
  ShellComponent,
} from '@atocha/spirit-islander/feature-shell';
import { Route } from '@atocha/spirit-islander/util';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: Route.config,
        title: 'Config | Spirit Islander',
        data: { state: Route.config },
        loadComponent: () =>
          import('@atocha/spirit-islander/feature-config').then(
            (m) => m.ConfigComponent
          ),
      },
      {
        path: Route.gameSetup,
        title: 'Game Setup | Spirit Islander',
        data: { state: Route.gameSetup },
        loadComponent: () =>
          import('@atocha/spirit-islander/feature-game-setup').then(
            (m) => m.GameSetupComponent
          ),
      },
      {
        path: Route.home,
        data: { state: Route.home },
        redirectTo: Route.config,
        pathMatch: 'full',
      },
      {
        path: Route.error,
        component: PageNotFoundComponent,
        title: 'Error | Spirit Islander',
      },
    ],
  },
];
