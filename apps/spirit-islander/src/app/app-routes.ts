import { Routes } from '@angular/router';

import { ROUTES } from '@atocha/spirit-islander/shared/data-access';
import {
  PageNotFoundComponent,
  ShellComponent,
} from '@atocha/spirit-islander/shell/feature';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: ROUTES.config,
        title: 'Config | Spirit Islander',
        data: { state: ROUTES.config },
        loadComponent: () =>
          import('@atocha/spirit-islander/config/feature').then(
            (m) => m.ConfigComponent
          ),
      },
      {
        path: ROUTES.gameSetup,
        title: 'Game Setup | Spirit Islander',
        data: { state: ROUTES.gameSetup },
        loadComponent: () =>
          import('@atocha/spirit-islander/game-setup/feature').then(
            (m) => m.GameSetupComponent
          ),
      },
      {
        path: ROUTES.settings,
        title: 'Settings | Spirit Islander',
        data: { state: ROUTES.settings },
        loadComponent: () =>
          import('@atocha/spirit-islander/settings/feature').then(
            (m) => m.SettingsComponent
          ),
      },
      {
        path: ROUTES.home,
        data: { state: ROUTES.home },
        redirectTo: ROUTES.config,
        pathMatch: 'full',
      },
      {
        path: ROUTES.error,
        component: PageNotFoundComponent,
        title: 'Error | Spirit Islander',
      },
    ],
  },
];
