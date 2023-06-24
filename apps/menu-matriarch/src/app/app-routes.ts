import { Routes } from '@angular/router';

import {
  AuthGuard,
  LoggedInAuthGuard,
  PlannerGuard,
} from '@atocha/menu-matriarch/data-access';
import {
  WelcomeComponent,
  PageNotFoundComponent,
  ShellComponent,
} from '@atocha/menu-matriarch/shell/feature';
import { Route } from '@atocha/menu-matriarch/util';

export const APP_ROUTES: Routes = [
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
        loadComponent: () =>
          import('@atocha/menu-matriarch/planner/feature').then(
            (m) => m.PlannerComponent
          ),
      },
      {
        path: Route.planner,
        title: 'Menu Matriarch | Planner',
        data: { state: Route.planner },
        canActivate: [PlannerGuard],
        loadComponent: () =>
          import('@atocha/menu-matriarch/planner/feature').then(
            (m) => m.PlannerComponent
          ),
      },
      {
        path: Route.menus,
        title: 'Menu Matriarch | Menus',
        data: { state: Route.menus },
        loadComponent: () =>
          import('@atocha/menu-matriarch/menus/feature').then(
            (m) => m.MenusComponent
          ),
      },
      {
        path: Route.meals,
        title: 'Menu Matriarch | Meals',
        data: { state: Route.meals },
        loadChildren: () =>
          import('@atocha/menu-matriarch/meals/feature').then(
            (m) => m.MEALS_ROUTES
          ),
      },
      {
        path: Route.dishes,
        title: 'Menu Matriarch | Dishes',
        data: { state: Route.dishes },
        loadChildren: () =>
          import('@atocha/menu-matriarch/dishes/feature').then(
            (m) => m.DISHES_ROUTES
          ),
      },
      {
        path: Route.ingredients,
        title: 'Menu Matriarch | Ingredients',
        data: { state: Route.ingredients },
        loadComponent: () =>
          import('@atocha/menu-matriarch/ingredients/feature').then(
            (m) => m.IngredientsComponent
          ),
      },
      {
        path: Route.tags,
        title: 'Menu Matriarch | Tags',
        data: { state: Route.tags },
        loadComponent: () =>
          import('@atocha/menu-matriarch/tags/feature').then(
            (m) => m.TagsComponent
          ),
      },
      {
        path: Route.settings,
        title: 'Menu Matriarch | Settings',
        data: { state: Route.settings },
        loadComponent: () =>
          import('@atocha/menu-matriarch/settings/feature').then(
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
