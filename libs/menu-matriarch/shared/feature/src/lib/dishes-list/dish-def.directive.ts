import { Directive, TemplateRef, inject } from '@angular/core';

import { Dish } from '@atocha/menu-matriarch/shared/util';

export interface DishContext {
  $implicit: Dish;
  activeDish: Dish | undefined;
}

@Directive({
  standalone: true,
  selector: '[appDishDef]',
})
export class DishDefDirective {
  template = inject<TemplateRef<DishContext>>(TemplateRef);
}
