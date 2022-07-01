import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent, PageNotFoundComponent } from '@atocha/globetrotter-feature-shell';
import { CountryService } from '@atocha/globetrotter-data-access';
import { Route } from '@atocha/globetrotter-types';
import { ShellComponent } from './components/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    resolve: { countries: CountryService },
    children: [
      {
        path: Route.home,
        component: HomeComponent,
      },
      {
        path: Route.explore,
        loadChildren: () =>
          import('@atocha/globetrotter-feature-explore').then(
            (m) => m.GlobetrotterFeatureExploreModule
          ),
      },
      {
        path: Route.learn,
        loadChildren: () =>
          import('@atocha/globetrotter-feature-learn').then(
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
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
