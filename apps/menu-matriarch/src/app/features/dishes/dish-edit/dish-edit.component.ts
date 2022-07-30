import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { concatMap, first, map, tap } from 'rxjs/operators';

import { DishType } from '@models/dish-type.type';
import { TagModel } from '@models/tag-model.interface';
import { DishService } from '@services/dish.service';
import { TagService } from '@services/tag.service';
import { getDishTypes } from '@utility/domain/get-dish-types';
import { trackBySelf } from '@utility/domain/track-by-functions';
import { recordToArray } from '@utility/generic/record-to-array';

interface DishEditForm {
  name: string;
  description: string;
  link: string;
  type: DishType;
  tagIds: string[];
  notes: string;
}

@Component({
  selector: 'app-dish-edit',
  templateUrl: './dish-edit.component.html',
  styleUrls: ['./dish-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishEditComponent {
  private _routeId = this._route.snapshot.paramMap.get('id');
  private _dish$ = this._routeId
    ? this._dishService.getDish(this._routeId)
    : of(undefined);
  public vm$ = combineLatest([
    this._dish$,
    this._tagService.getTags(),
  ]).pipe(
    map(([dish, tags]) => {
      if (!dish) {
        return {
          name: '',
          description: '',
          link: '',
          type: 'main',
          tags: tags.map<TagModel>(tag => ({
            ...tag,
            checked: false,
          })),
          notes: '',
        };
      } else {
        return {
          ...dish,
          tags: tags.map<TagModel>(tag => ({
            ...tag,
            checked: !!dish?.tags.find(dishTag => dishTag.id === tag.id)
          })),
        };
      }
    })
  );
  public readonly dishTypes = getDishTypes();
  public readonly tinyMceConfig = {
    height: 300,
    menubar: false,
    plugins: [
      'lists',
      'searchreplace',
      'wordcount'
    ],
    toolbar:
      `undo redo | formatselect | bold italic underline forecolor backcolor |
      bullist numlist outdent indent | removeformat | help`,
  };
  public readonly typeTrackByFn = trackBySelf;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dishService: DishService,
    private _tagService: TagService,
  ) { }

  public async onSave(form: NgForm): Promise<void> {
    const details: DishEditForm = {
      name: form.value.name,
      description: form.value.description,
      link: form.value.link,
      type: form.value.type,
      tagIds: recordToArray<string>(form.value?.tags ?? []),
      notes: form.value.notes,
    };
    if (!this._routeId) {
      this._dishService.createDish(details).pipe(
        tap(newId => this._router.navigate(['..', newId], { relativeTo: this._route }))
      ).subscribe();
    } else {
      this._dish$.pipe(
        first(),
        concatMap(dish => {
          if (dish) {
            return this._dishService.updateDish(dish.id, details);
          } else {
            return of(undefined);
          }
        }),
        tap(() => this._router.navigate(['..'], { relativeTo: this._route }))
      ).subscribe();
    }
  }
}
