import { Directive, TemplateRef } from '@angular/core';

import { Meal, Orientation } from '@atocha/menu-matriarch/util';

export interface MealDefContext {
  $implicit: Meal;
  activeMeal: Meal;
  fallbackText: string;
  orientation: Orientation;
}

@Directive({
  selector: '[appMealDef]',
})
export class MealDefDirective {
  constructor(public template: TemplateRef<MealDefContext>) {}
}
