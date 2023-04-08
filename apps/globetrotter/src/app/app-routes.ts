import { Routes } from '@angular/router';

import {
  HomeComponent,
  PageNotFoundComponent,
  ShellComponent,
} from '@atocha/globetrotter/feature-shell';
import { Route } from '@atocha/globetrotter/util';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: Route.home,
        title: 'Globetrotter',
        component: HomeComponent,
      },
      {
        path: Route.explore,
        title: 'Globetrotter | Explore',
        loadComponent: () =>
          import('@atocha/globetrotter/feature-explore').then(
            (m) => m.ExploreComponent
          ),
      },
      {
        path: Route.learn,
        title: 'Globetrotter | Learn',
        loadChildren: () =>
          import('@atocha/globetrotter/feature-learn').then(
            (m) => m.LEARN_ROUTES
          ),
      },
      {
        path: '',
        redirectTo: Route.home,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
