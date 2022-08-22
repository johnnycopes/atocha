import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  HomeComponent,
  PageNotFoundComponent,
  ShellComponent,
} from '@atocha/globetrotter/feature-shell';
import { Route } from '@atocha/globetrotter/util';

const routes: Routes = [
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
        loadChildren: () =>
          import('@atocha/globetrotter/feature-explore').then(
            (m) => m.GlobetrotterFeatureExploreModule
          ),
      },
      {
        path: Route.learn,
        title: 'Globetrotter | Learn',
        loadChildren: () =>
          import('@atocha/globetrotter/feature-learn').then(
            (m) => m.GlobetrotterFeatureLearnModule
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

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
