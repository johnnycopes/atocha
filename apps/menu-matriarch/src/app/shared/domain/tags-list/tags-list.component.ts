import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  ContentChild,
} from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { Tag } from '@atocha/menu-matriarch/types';
import { TagDefContext, TagDefDirective } from './tag-def.directive';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsListComponent<T extends Tag> {
  @Input() tags: T[] = [];
  @Input() interactive = false;
  public readonly trackByFn = trackByFactory<Tag>(({ id }) => id);

  @ContentChild(TagDefDirective)
  public tagDef: TagDefDirective<T> | undefined;

  public get tagTemplate(): TemplateRef<TagDefContext<T>> | null {
    return this.tagDef?.template ?? null;
  }
}
