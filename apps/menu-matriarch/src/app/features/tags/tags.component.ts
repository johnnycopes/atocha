import { Component, ChangeDetectionStrategy } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { mapTo, shareReplay } from 'rxjs/operators';

import { trackByFactory } from '@atocha/core/ui';
import { TagService } from '@atocha/menu-matriarch/data-access';
import { Tag } from '@atocha/menu-matriarch/types';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {
  public tags$ = this._tagService.getTags();
  public startAdd$ = new Subject<void>();
  public finishAdd$ = new Subject<void>();
  public adding$ = merge(
    this.startAdd$.pipe(mapTo(true)),
    this.finishAdd$.pipe(mapTo(false))
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  public readonly trackByFn = trackByFactory<Tag>(({ id }) => id);

  constructor(private _tagService: TagService) {}

  public onNewTagSave(name: string): void {
    this._tagService.createTag({ name }).subscribe();
    this.finishAdd$.next();
  }

  public onTagEdit(id: string, name: string): void {
    this._tagService.updateTag(id, { name });
  }

  public onTagDelete(id: string): void {
    this._tagService.deleteTag(id).subscribe();
  }
}
