import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ButtonComponent, trackByFactory } from '@atocha/core/ui';
import { TagService } from '@atocha/menu-matriarch/data-access';
import { Tag } from '@atocha/menu-matriarch/util';
import {
  InlineNameEditComponent,
  SectionComponent,
} from '@atocha/menu-matriarch/ui';
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
  tags$ = this._tagService.getTags();
  startAdd$ = new Subject<void>();
  finishAdd$ = new Subject<void>();
  adding$ = merge(
    this.startAdd$.pipe(map(() => true)),
    this.finishAdd$.pipe(map(() => false))
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  readonly trackByFn = trackByFactory<Tag>(({ id }) => id);

  constructor(private _tagService: TagService) {}

  onNewTagSave(name: string): void {
    this._tagService.createTag({ name }).subscribe();
    this.finishAdd$.next();
  }

  onTagEdit(id: string, name: string): void {
    this._tagService.updateTag(id, { name });
  }

  onTagDelete(id: string): void {
    this._tagService.deleteTag(id).subscribe();
  }
}
