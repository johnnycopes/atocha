import { Route } from '@angular/router';

import {
  HomeComponent,
  PageNotFoundComponent,
  ShellComponent,
} from '@atocha/globetrotter/feature-shell';
import { Route as AppRoute } from '@atocha/globetrotter/util';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: AppRoute.home,
        title: 'Globetrotter',
        component: HomeComponent,
      },
      {
        path: AppRoute.explore,
        title: 'Globetrotter | Explore',
        loadComponent: () =>
          import('@atocha/globetrotter/feature-explore').then(
            (m) => m.ExploreComponent
          ),
      },
      {
        path: AppRoute.learn,
        title: 'Globetrotter | Learn',
        loadChildren: () =>
          import('@atocha/globetrotter/feature-learn').then(
            (m) => m.LEARN_ROUTES
          ),
      },
      {
        path: '',
        redirectTo: AppRoute.home,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
