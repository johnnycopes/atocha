import { Directive, TemplateRef } from '@angular/core';

import { Tag } from '@models/tag.interface';

export interface TagDefContext<T extends Tag> {
  $implicit: T;
}

@Directive({
  selector: '[appTagDef]'
})
export class TagDefDirective<T extends Tag> {

  constructor(public template: TemplateRef<TagDefContext<T>>) { }

}
