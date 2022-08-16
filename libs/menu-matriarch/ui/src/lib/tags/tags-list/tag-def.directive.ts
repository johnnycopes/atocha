import { Directive, TemplateRef } from '@angular/core';

import { Tag } from '@atocha/menu-matriarch/types';

export interface TagDefContext<T extends Tag> {
  $implicit: T;
}

@Directive({
  standalone: true,
  selector: '[uiTagDef]',
})
export class TagDefDirective<T extends Tag> {
  constructor(public template: TemplateRef<TagDefContext<T>>) {}
}
