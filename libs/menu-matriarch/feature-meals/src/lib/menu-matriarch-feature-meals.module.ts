import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { MealPlaceholderComponent } from './meal-placeholder/meal-placeholder.component';
import { MealsComponent } from './meals.component';

@NgModule({
  imports: [
    MealsComponent,
    RouterModule.forChild([
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
    ]),
  ],
})
export class MenuMatriarchFeatureMealsModule {}
