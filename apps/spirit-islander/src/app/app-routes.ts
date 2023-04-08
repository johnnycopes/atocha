import { Routes } from '@angular/router';

import { ShellComponent } from '@atocha/spirit-islander/feature-shell';
import { Route } from '@atocha/spirit-islander/util';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: Route.Config,
        title: 'Config | Spirit Islander',
        data: { state: Route.Config },
        loadComponent: () =>
          import('@atocha/spirit-islander/feature-config').then(
            (m) => m.ConfigComponent
          ),
      },
      {
        path: Route.GameSetup,
        title: 'Game Setup | Spirit Islander',
        data: { state: Route.GameSetup },
        loadComponent: () =>
          import('@atocha/spirit-islander/feature-game-setup').then(
            (m) => m.GameSetupComponent
          ),
      },
      {
        path: Route.Home,
        data: { state: Route.Home },
        redirectTo: Route.Config,
        pathMatch: 'full',
      },
      {
        path: Route.Error,
        title: 'Error | Spirit Islander',
        data: { state: Route.Error },
        loadComponent: () =>
          import('@atocha/spirit-islander/feature-shell').then(
            (m) => m.PageNotFoundComponent
          ),
      },
    ],
  },
];
