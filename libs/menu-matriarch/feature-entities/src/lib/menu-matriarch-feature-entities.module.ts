import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FilterableListComponent,
  TabComponent,
  TabsetComponent,
} from '@atocha/menu-matriarch/ui';
import { DishDefDirective } from './dishes-list/dish-def.directive';
import { DishesListComponent } from './dishes-list/dishes-list.component';
import { MealDefDirective } from './meals-list/meal-def.directive';
import { MealsListComponent } from './meals-list/meals-list.component';

@NgModule({
  imports: [
    CommonModule,
    DishDefDirective,
    DishesListComponent,
    FilterableListComponent,
    MealDefDirective,
    MealsListComponent,
    TabsetComponent,
    TabComponent,
  ],
  exports: [
    DishDefDirective,
    DishesListComponent,
    MealDefDirective,
    MealsListComponent,
  ],
})
export class MenuMatriarchFeatureEntitiesModule {}
