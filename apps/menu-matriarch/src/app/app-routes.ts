import { Route } from '@angular/router';

import {
  LoggedInAuthGuard,
  AuthGuard,
  PlannerGuard,
} from '@atocha/menu-matriarch/data-access';
import {
  WelcomeComponent,
  ShellComponent,
  PageNotFoundComponent,
} from '@atocha/menu-matriarch/feature-shell';
import { Route as AppRoute } from '@atocha/menu-matriarch/util';

export const APP_ROUTES: Route[] = [
  {
    path: 'welcome',
    title: 'Menu Matriarch | Welcome',
    component: WelcomeComponent,
    canActivate: [LoggedInAuthGuard],
    data: { state: AppRoute.welcome },
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: `${AppRoute.planner}/:menuId`,
        title: 'Menu Matriarch | Planner',
        data: { state: AppRoute.planner },
        loadComponent: () =>
          import('@atocha/menu-matriarch/feature-planner').then(
            (m) => m.PlannerComponent
          ),
      },
      {
        path: AppRoute.planner,
        title: 'Menu Matriarch | Planner',
        data: { state: AppRoute.planner },
        canActivate: [PlannerGuard],
        loadComponent: () =>
          import('@atocha/menu-matriarch/feature-planner').then(
            (m) => m.PlannerComponent
          ),
      },
      {
        path: AppRoute.menus,
        title: 'Menu Matriarch | Menus',
        data: { state: AppRoute.menus },
        loadComponent: () =>
          import('@atocha/menu-matriarch/feature-menus').then(
            (m) => m.MenusComponent
          ),
      },
      {
        path: AppRoute.meals,
        title: 'Menu Matriarch | Meals',
        data: { state: AppRoute.meals },
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-meals').then(
            (m) => m.MEALS_ROUTES
          ),
      },
      {
        path: AppRoute.dishes,
        title: 'Menu Matriarch | Dishes',
        data: { state: AppRoute.dishes },
        loadChildren: () =>
          import('@atocha/menu-matriarch/feature-dishes').then(
            (m) => m.DISHES_ROUTES
          ),
      },
      {
        path: AppRoute.tags,
        title: 'Menu Matriarch | Tags',
        data: { state: AppRoute.tags },
        loadComponent: () =>
          import('@atocha/menu-matriarch/feature-tags').then(
            (m) => m.TagsComponent
          ),
      },
      {
        path: AppRoute.settings,
        title: 'Menu Matriarch | Settings',
        data: { state: AppRoute.settings },
        loadComponent: () =>
          import('@atocha/menu-matriarch/feature-settings').then(
            (m) => m.SettingsComponent
          ),
      },
      {
        path: '',
        redirectTo: AppRoute.planner,
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
];
