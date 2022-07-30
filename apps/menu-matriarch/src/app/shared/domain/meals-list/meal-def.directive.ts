import { Directive, TemplateRef } from '@angular/core';

import { Meal } from '@models/meal.interface';
import { Orientation } from '@models/orientation.type';

export interface MealDefContext {
  $implicit: Meal;
  activeMeal: Meal;
  fallbackText: string;
  orientation: Orientation;
}

@Directive({
  selector: '[appMealDef]'
})
export class MealDefDirective {

  constructor(public template: TemplateRef<MealDefContext>) { }

}
