import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, first, tap } from 'rxjs/operators';

import { TagDto } from '@models/dtos/tag-dto.interface';
import { Tag } from '@models/tag.interface';
import { AuthService } from './auth.service';
import { TagDataService } from './internal/tag-data.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private _authService: AuthService,
    private _tagDataService: TagDataService,
  ) { }

  public getTag(id: string): Observable<Tag | undefined> {
    return this._tagDataService.getTag(id);
  }

  public getTags(): Observable<Tag[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(uid => {
        if (uid) {
          return this._tagDataService.getTags(uid);
        }
        return of([]);
      })
    );
  }

  public createTag(tag: Partial<Omit<TagDto, 'id' | 'uid'>>): Observable<string | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(async uid => {
        if (uid) {
          const id = await this._tagDataService.createTag({ uid, tag });
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  public updateTag(id: string, data: Partial<TagDto>): Promise<void> {
    return this._tagDataService.updateTag(id, data);
  }

  public deleteTag(id: string): Observable<Tag | undefined> {
    return this.getTag(id).pipe(
      first(),
      tap(async tag => {
        if (!tag) {
          return;
        }
        await this._tagDataService.deleteTag(tag);
      })
    );
  }
}
