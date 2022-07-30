import { Component, ChangeDetectionStrategy } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { mapTo, shareReplay } from 'rxjs/operators';

import { TagService } from '@services/tag.service';
import { trackById } from '@utility/domain/track-by-functions';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent {
  public tags$ = this._tagService.getTags();
  public startAdd$ = new Subject<void>();
  public finishAdd$ = new Subject<void>();
  public adding$ = merge(
    this.startAdd$.pipe(mapTo(true)),
    this.finishAdd$.pipe(mapTo(false)),
  ).pipe(
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  public readonly trackByFn = trackById;

  constructor(private _tagService: TagService) { }

  public onNewTagSave(name: string): void {
    this._tagService
      .createTag({ name })
      .subscribe();
    this.finishAdd$.next();
  }

  public onTagEdit(id: string, name: string): void {
    this._tagService.updateTag(id, { name });
  }

  public onTagDelete(id: string): void {
    this._tagService
      .deleteTag(id)
      .subscribe();
  }
}
