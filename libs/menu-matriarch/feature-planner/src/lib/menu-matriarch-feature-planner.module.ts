import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonComponent, CheckboxComponent } from '@atocha/core/ui';
import { MenuMatriarchFeatureEntitiesModule } from '@atocha/menu-matriarch/feature-entities';
import {
  ButtonComponent as LegacyButtonComponent,
  CardComponent,
  DishSummaryComponent,
  EmptyViewPlaceholderComponent,
  MealSummaryComponent,
  SectionComponent,
  SmallCapsLabelComponent,
  TagComponent,
  TagsListComponent,
} from '@atocha/menu-matriarch/ui';
import { PlannerComponent } from './planner.component';
import { PlannerDishComponent } from './planner-dishes/planner-dish/planner-dish.component';
import { PlannerDishesComponent } from './planner-dishes/planner-dishes.component';
import { PlannerMealComponent } from './planner-meals/planner-meal/planner-meal.component';
import { PlannerMealsComponent } from './planner-meals/planner-meals.component';
import { PlannerDayComponent } from './planner-menu/planner-day/planner-day.component';
import { PlannerMenuComponent } from './planner-menu/planner-menu.component';

@NgModule({
  declarations: [
    PlannerComponent,
    PlannerDayComponent,
    PlannerDishComponent,
    PlannerDishesComponent,
    PlannerMealComponent,
    PlannerMealsComponent,
    PlannerMenuComponent,
  ],
  imports: [
    ButtonComponent,
    LegacyButtonComponent,
    CardComponent,
    CheckboxComponent,
    CommonModule,
    DishSummaryComponent,
    EmptyViewPlaceholderComponent,
    FontAwesomeModule,
    FormsModule,
    MealSummaryComponent,
    MenuMatriarchFeatureEntitiesModule,
    RouterModule.forChild([{ path: '', component: PlannerComponent }]),
    SectionComponent,
    SmallCapsLabelComponent,
    TagComponent,
    TagsListComponent,
  ],
})
export class MenuMatriarchFeaturePlannerModule {}
