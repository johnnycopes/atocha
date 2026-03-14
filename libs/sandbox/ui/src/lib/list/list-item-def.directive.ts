import { Directive, TemplateRef, inject } from '@angular/core';

import { Item } from './item.interface';

export interface ListItemContext {
  $implicit: Item;
}

@Directive({
  standalone: true,
  selector: '[appListItemDef]',
})
export class ListItemDefDirective {
  template = inject<TemplateRef<ListItemContext>>(TemplateRef);
}
