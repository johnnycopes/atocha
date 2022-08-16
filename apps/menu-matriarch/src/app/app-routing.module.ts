import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        path: `${Route.planner}/:menuId`,
        data: { state: Route.planner },
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-planner').then(
            (m) => m.MenuMatriarchFeaturePlannerModule
          ),
      },
      {
        path: Route.planner,
        data: { state: Route.planner },
        canActivate: [PlannerGuard],
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-planner').then(
            (m) => m.MenuMatriarchFeaturePlannerModule
          ),
      },
      {
        path: Route.menus,
        data: { state: Route.menus },
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-menus').then(
            (m) => m.MenuMatriarchFeatureMenusModule
          ),
      },
      {
        path: Route.tags,
        data: { state: Route.tags },
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-tags').then(
            (m) => m.MenuMatriarchFeatureTagsModule
          ),
      },
      {
        path: Route.meals,
        data: { state: Route.meals },
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-meals').then(
            (m) => m.MenuMatriarchFeatureMealsModule
          ),
      },
      {
        path: Route.dishes,
        data: { state: Route.dishes },
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-dishes').then(
            (m) => m.MenuMatriarchFeatureDishesModule
          ),
      },
      {
        path: Route.settings,
        data: { state: Route.settings },
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-settings').then(
            (m) => m.MenuMatriarchFeatureSettingsModule
          ),
      },
      {
        path: '',
        redirectTo: Route.planner,
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
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
