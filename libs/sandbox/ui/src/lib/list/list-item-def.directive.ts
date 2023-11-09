import { Directive, TemplateRef } from '@angular/core';

import { Item } from './item.interface';

export interface ListItemContext {
  $implicit: Item;
}

@Directive({
  selector: '[appListItemDef]',
})
export class ListItemDefDirective {
  constructor(public template: TemplateRef<ListItemContext>) {}
}
