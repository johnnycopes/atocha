import { Component, ChangeDetectionStrategy, Input, TemplateRef, ContentChild } from '@angular/core';

import { Tag } from '@models/tag.interface';
import { trackById } from '@utility/domain/track-by-functions';
import { TagDefContext, TagDefDirective } from './tag-def.directive';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsListComponent<T extends Tag> {
  @Input() tags: T[] = [];
  @Input() interactive = false;
  public readonly trackByFn = trackById;

  @ContentChild(TagDefDirective)
  public tagDef: TagDefDirective<T> | undefined;

  public get tagTemplate(): TemplateRef<TagDefContext<T>> | null {
    return this.tagDef?.template ?? null;
  }
}
