import { Directive, TemplateRef, inject } from '@angular/core';

import { Meal, Orientation } from '@atocha/menu-matriarch/shared/util';

export interface MealDefContext {
  $implicit: Meal;
  activeMeal: Meal;
  fallbackText: string;
  orientation: Orientation;
}

@Directive({
  standalone: true,
  selector: '[appMealDef]',
})
export class MealDefDirective {
  template = inject<TemplateRef<MealDefContext>>(TemplateRef);
}
