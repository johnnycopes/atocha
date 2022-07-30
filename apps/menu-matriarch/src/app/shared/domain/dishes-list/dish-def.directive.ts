import { Directive, TemplateRef } from '@angular/core';

import { Dish } from '@models/dish.interface';

export interface DishContext {
  $implicit: Dish,
  activeDish: Dish | undefined;
}

@Directive({
  selector: '[appDishDef]'
})
export class DishDefDirective {

  constructor(public template: TemplateRef<DishContext>) { }

}
