import { Routes } from '@angular/router';

import { DishDetailsComponent } from './dish-details/dish-details.component';
import { DishEditComponent } from './dish-edit/dish-edit.component';
import { DishPlaceholderComponent } from './dish-placeholder/dish-placeholder.component';
import { DishesComponent } from './dishes.component';

export const DISHES_ROUTES: Routes = [
  {
    path: '',
    component: DishesComponent,
    children: [
      { path: '', component: DishPlaceholderComponent, pathMatch: 'full' },
      { path: 'new', component: DishEditComponent },
      { path: ':id', component: DishDetailsComponent },
      { path: ':id/edit', component: DishEditComponent },
    ],
  },
];
