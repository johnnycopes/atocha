import { Routes } from '@angular/router';

import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { MealPlaceholderComponent } from './meal-placeholder/meal-placeholder.component';
import { MealsComponent } from './meals.component';

export const MEALS_ROUTES: Routes = [
  {
    path: '',
    component: MealsComponent,
    children: [
      { path: '', component: MealPlaceholderComponent, pathMatch: 'full' },
      { path: 'new', component: MealEditComponent },
      { path: ':id', component: MealDetailsComponent },
      { path: ':id/edit', component: MealEditComponent },
    ],
  },
];
