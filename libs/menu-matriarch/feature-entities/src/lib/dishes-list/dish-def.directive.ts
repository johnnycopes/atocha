import { Directive, TemplateRef } from '@angular/core';

import { Dish } from '@atocha/menu-matriarch/util';

export interface DishContext {
  $implicit: Dish;
  activeDish: Dish | undefined;
}

@Directive({
  standalone: true,
  selector: '[appDishDef]',
})
export class DishDefDirective {
  constructor(public template: TemplateRef<DishContext>) {}
}
