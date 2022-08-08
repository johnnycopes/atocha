import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MenuMatriarchUiModule } from '@atocha/menu-matriarch/ui';
import { MealCardComponent } from './meal-card/meal-card.component';
import { MealDefDirective } from './meals-list/meal-def.directive';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { MealPlaceholderComponent } from './meal-placeholder/meal-placeholder.component';
import { MealsComponent } from './meals.component';
import { MealsListComponent } from './meals-list/meals-list.component';

@NgModule({
  declarations: [
    MealCardComponent,
    MealDefDirective,
    MealDetailsComponent,
    MealEditComponent,
    MealPlaceholderComponent,
    MealsComponent,
    MealsListComponent,
  ],
  imports: [
    MenuMatriarchUiModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: MealsComponent, children: [
        { path: '', component: MealPlaceholderComponent, pathMatch: 'full' },
          { path: 'new', component: MealEditComponent },
          { path: ':id', component: MealDetailsComponent },
          { path: ':id/edit', component: MealEditComponent },
      ] }
    ]),
  ],
  exports: [
    MealsListComponent,
  ]
})
export class MenuMatriarchFeatureMealsModule {}
