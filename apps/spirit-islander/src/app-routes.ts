import { Route } from '@angular/router';
import { Route as AppRoute } from '@atocha/spirit-islander/util';

export const APP_ROUTES: Route[] = [
  {
    path: AppRoute.Config,
    title: 'Config | Spirit Islander',
    loadComponent: () =>
      import('@atocha/spirit-islander/feature-config').then(
        (m) => m.ConfigComponent
      ),
  },
  {
    path: AppRoute.GameSetup,
    title: 'Game Setup | Spirit Islander',
    loadComponent: () =>
      import('@atocha/spirit-islander/feature-game-setup').then(
        (m) => m.GameSetupComponent
      ),
  },
  {
    path: AppRoute.Home,
    redirectTo: AppRoute.Config,
    pathMatch: 'full',
  },
  {
    path: AppRoute.Error,
    title: 'Error | Spirit Islander',
    loadComponent: () =>
      import('@atocha/spirit-islander/feature-shell').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
