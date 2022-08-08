import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuMatriarchUiModule } from '@atocha/menu-matriarch/ui';
import { DishDefDirective } from './dishes-list/dish-def.directive';
import { DishesListComponent } from './dishes-list/dishes-list.component';
import { MealDefDirective } from './meals-list/meal-def.directive';
import { MealsListComponent } from './meals-list/meals-list.component';

@NgModule({
  declarations: [
    DishDefDirective,
    DishesListComponent,
    MealDefDirective,
    MealsListComponent,
  ],
  exports: [
    DishDefDirective,
    DishesListComponent,
    MealDefDirective,
    MealsListComponent,
  ],
  imports: [
    MenuMatriarchUiModule,
    CommonModule,
  ],
})
export class MenuMatriarchFeatureEntitiesModule {}
