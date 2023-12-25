import { Routes } from '@angular/router';

import {
  HomeComponent,
  PageNotFoundComponent,
  ShellComponent,
} from '@atocha/globetrotter/feature-shell';
import { ROUTES } from '@atocha/globetrotter/data-access';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: ROUTES.home,
        title: 'Globetrotter',
        component: HomeComponent,
      },
      {
        path: ROUTES.explore,
        title: 'Explore | Globetrotter',
        loadComponent: () =>
          import('@atocha/globetrotter/explore/feature').then(
            (m) => m.ExploreComponent
          ),
      },
      {
        path: ROUTES.learn,
        title: 'Learn | Globetrotter',
        loadChildren: () =>
          import('@atocha/globetrotter/feature-learn').then(
            (m) => m.LEARN_ROUTES
          ),
      },
      {
        path: '',
        redirectTo: ROUTES.home,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    title: 'Error | Globetrotter',
    component: PageNotFoundComponent,
  },
];
