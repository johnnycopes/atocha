import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subject, merge, map, shareReplay } from 'rxjs';

import { ButtonComponent, trackByFactory } from '@atocha/core/ui';
import { TagService } from '@atocha/menu-matriarch/tags/data-access';
import { Tag } from '@atocha/menu-matriarch/shared/util';
import { InlineNameEditComponent } from '@atocha/menu-matriarch/shared/ui-domain';
import { SectionComponent } from '@atocha/menu-matriarch/shared/ui-generic';
import { TagCardComponent } from './tag-card/tag-card.component';

@Component({
  standalone: true,
  selector: 'app-tags',
  imports: [
    ButtonComponent,
    CommonModule,
    InlineNameEditComponent,
    SectionComponent,
    TagCardComponent,
  ],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {
  tags$ = this._tagService.getAll();
  startAdd$ = new Subject<void>();
  finishAdd$ = new Subject<void>();
  adding$ = merge(
    this.startAdd$.pipe(map(() => true)),
    this.finishAdd$.pipe(map(() => false))
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  readonly trackByFn = trackByFactory<Tag>(({ id }) => id);

  constructor(private _tagService: TagService) {}

  onNewTagSave(name: string): void {
    this._tagService.create({ name }).subscribe();
    this.finishAdd$.next();
  }

  onTagEdit(tag: Tag, name: string): void {
    this._tagService.update(tag, { name });
  }

  onTagDelete(tag: Tag): void {
    this._tagService.delete(tag);
  }
}
