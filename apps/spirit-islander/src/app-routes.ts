import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: 'config',
    title: 'Config | Spirit Islander',
    loadComponent: () =>
      import('@atocha/spirit-islander/feature-config').then(
        (m) => m.ConfigComponent
      ),
  },
  {
    path: 'game-setup',
    title: 'Game Setup | Spirit Islander',
    loadComponent: () =>
      import('@atocha/spirit-islander/feature-game-setup').then(
        (m) => m.GameSetupComponent
      ),
  },
  {
    path: 'error',
    loadComponent: () =>
      import('@atocha/spirit-islander/feature-shell').then(
        (m) => m.ErrorComponent
      ),
  },
  {
    path: '',
    redirectTo: 'config',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('@atocha/spirit-islander/feature-shell').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
