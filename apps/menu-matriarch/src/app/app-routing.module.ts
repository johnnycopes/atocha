import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {
  AuthGuard,
  LoggedInAuthGuard,
  PlannerGuard,
} from '@atocha/menu-matriarch/data-access';
import {
  PageNotFoundComponent,
  ShellComponent,
  WelcomeComponent,
} from '@atocha/menu-matriarch/feature-shell';
import { Route } from '@atocha/menu-matriarch/types';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [LoggedInAuthGuard],
    data: { state: Route.welcome },
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'planner/:menuId',
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-planner').then(
            (m) => m.MenuMatriarchFeaturePlannerModule
          ),
      },
      {
        path: 'planner',
        canActivate: [PlannerGuard],
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-planner').then(
            (m) => m.MenuMatriarchFeaturePlannerModule
          ),
      },
      {
        path: 'menus',
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-menus').then(
            (m) => m.MenuMatriarchFeatureMenusModule
          ),
      },
      {
        path: 'tags',
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-tags').then(
            (m) => m.MenuMatriarchFeatureTagsModule
          ),
      },
      {
        path: 'meals',
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-meals').then(
            (m) => m.MenuMatriarchFeatureMealsModule
          ),
      },
      {
        path: 'dishes',
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-dishes').then(
            (m) => m.MenuMatriarchFeatureDishesModule
          ),
      },
      {
        path: '',
        redirectTo: 'planner',
        pathMatch: 'full',
        data: { state: Route.planner },
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-settings').then(
            (m) => m.MenuMatriarchFeatureSettingsModule
          ),
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
