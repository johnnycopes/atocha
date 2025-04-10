import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  ContentChild,
} from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { Tag } from '@atocha/menu-matriarch/shared/util';
import { TagDefContext, TagDefDirective } from './tag-def.directive';

@Component({
    selector: 'ui-tags-list',
    imports: [CommonModule],
    templateUrl: './tags-list.component.html',
    styleUrls: ['./tags-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsListComponent<T extends Tag> {
  @Input() tags: T[] = [];
  @Input() interactive = false;
  readonly trackByFn = trackByFactory<Tag>(({ id }) => id);

  @ContentChild(TagDefDirective)
  tagDef: TagDefDirective<T> | undefined;

  get tagTemplate(): TemplateRef<TagDefContext<T>> | null {
    return this.tagDef?.template ?? null;
  }
}
