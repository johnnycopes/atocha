import { Routes } from '@angular/router';

import {
  AuthGuard,
  LoggedInAuthGuard,
} from '@atocha/menu-matriarch/shell/data-access';
import { PlannerGuard } from '@atocha/menu-matriarch/planner/data-access';
import { ROUTES } from '@atocha/menu-matriarch/shared/data-access-routing';
import {
  WelcomeComponent,
  PageNotFoundComponent,
  ShellComponent,
} from '@atocha/menu-matriarch/shell/feature';

export const APP_ROUTES: Routes = [
  {
    path: 'welcome',
    title: 'Menu Matriarch | Welcome',
    component: WelcomeComponent,
    canActivate: [LoggedInAuthGuard],
    data: { state: ROUTES.welcome },
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: `${ROUTES.planner}/:menuId`,
        title: 'Menu Matriarch | Planner',
        data: { state: ROUTES.planner },
        loadComponent: () =>
          import('@atocha/menu-matriarch/planner/feature').then(
            (m) => m.PlannerComponent
          ),
      },
      {
        path: ROUTES.planner,
        title: 'Menu Matriarch | Planner',
        data: { state: ROUTES.planner },
        canActivate: [PlannerGuard],
        loadComponent: () =>
          import('@atocha/menu-matriarch/planner/feature').then(
            (m) => m.PlannerComponent
          ),
      },
      {
        path: ROUTES.menus,
        title: 'Menu Matriarch | Menus',
        data: { state: ROUTES.menus },
        loadComponent: () =>
          import('@atocha/menu-matriarch/menus/feature').then(
            (m) => m.MenusComponent
          ),
      },
      {
        path: ROUTES.meals,
        title: 'Menu Matriarch | Meals',
        data: { state: ROUTES.meals },
        loadChildren: () =>
          import('@atocha/menu-matriarch/meals/feature').then(
            (m) => m.MEALS_ROUTES
          ),
      },
      {
        path: ROUTES.dishes,
        title: 'Menu Matriarch | Dishes',
        data: { state: ROUTES.dishes },
        loadChildren: () =>
          import('@atocha/menu-matriarch/dishes/feature').then(
            (m) => m.DISHES_ROUTES
          ),
      },
      {
        path: ROUTES.ingredients,
        title: 'Menu Matriarch | Ingredients',
        data: { state: ROUTES.ingredients },
        loadComponent: () =>
          import('@atocha/menu-matriarch/ingredients/feature').then(
            (m) => m.IngredientsComponent
          ),
      },
      {
        path: ROUTES.tags,
        title: 'Menu Matriarch | Tags',
        data: { state: ROUTES.tags },
        loadComponent: () =>
          import('@atocha/menu-matriarch/tags/feature').then(
            (m) => m.TagsComponent
          ),
      },
      {
        path: ROUTES.settings,
        title: 'Menu Matriarch | Settings',
        data: { state: ROUTES.settings },
        loadComponent: () =>
          import('@atocha/menu-matriarch/settings/feature').then(
            (m) => m.SettingsComponent
          ),
      },
      {
        path: '',
        redirectTo: ROUTES.planner,
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
];
