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
import { Route } from '@atocha/menu-matriarch/util';

const routes: Routes = [
  {
    path: 'welcome',
    title: 'Menu Matriarch | Welcome',
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
        title: 'Menu Matriarch | Planner',
        data: { state: Route.planner },
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-planner').then(
            (m) => m.MenuMatriarchFeaturePlannerModule
          ),
      },
      {
        path: Route.planner,
        title: 'Menu Matriarch | Planner',
        data: { state: Route.planner },
        canActivate: [PlannerGuard],
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-planner').then(
            (m) => m.MenuMatriarchFeaturePlannerModule
          ),
      },
      {
        path: Route.menus,
        title: 'Menu Matriarch | Menus',
        data: { state: Route.menus },
        loadComponent: () =>
          import('@atocha/menu-matriarch/feature-menus').then(
            (m) => m.MenusComponent
          ),
      },
      {
        path: Route.meals,
        title: 'Menu Matriarch | Meals',
        data: { state: Route.meals },
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-meals').then(
            (m) => m.MenuMatriarchFeatureMealsModule
          ),
      },
      {
        path: Route.dishes,
        title: 'Menu Matriarch | Dishes',
        data: { state: Route.dishes },
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-dishes').then(
            (m) => m.DISHES_ROUTES
          ),
      },
      {
        path: Route.tags,
        title: 'Menu Matriarch | Tags',
        data: { state: Route.tags },
        loadComponent: () =>
          import('@atocha/menu-matriarch/feature-tags').then(
            (m) => m.TagsComponent
          ),
      },
      {
        path: Route.settings,
        title: 'Menu Matriarch | Settings',
        data: { state: Route.settings },
        loadComponent: () =>
          import('@atocha/menu-matriarch/feature-settings').then(
            (m) => m.SettingsComponent
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
