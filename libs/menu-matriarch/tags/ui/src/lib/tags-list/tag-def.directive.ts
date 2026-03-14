import { Directive, TemplateRef, inject } from '@angular/core';

import { Tag } from '@atocha/menu-matriarch/shared/util';

export interface TagDefContext<T extends Tag> {
  $implicit: T;
}

@Directive({
  standalone: true,
  selector: '[uiTagDef]',
})
export class TagDefDirective<T extends Tag> {
  template = inject<TemplateRef<TagDefContext<T>>>(TemplateRef);
}
