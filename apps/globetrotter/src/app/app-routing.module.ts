import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { CountryService } from '@atocha/data-access-globetrotter';
import { Route } from '@atocha/globetrotter-types';
import { ShellComponent } from './components/shell/shell.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

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
          import('./modules/explore/explore.module').then(
            (m) => m.ExploreModule
          ),
      },
      {
        path: Route.learn,
        loadChildren: () =>
          import('./modules/learn/learn.module').then((m) => m.LearnModule),
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
