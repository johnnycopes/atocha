import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';

import { DishService, TagService } from '@atocha/menu-matriarch/data-access';
import { DishType, TagModel } from '@atocha/menu-matriarch/util';
import {
  DishEditDetails,
  DishEditFormComponent,
} from './dish-edit-form/dish-edit-form.component';

@Component({
  standalone: true,
  selector: 'app-dish-edit',
  imports: [CommonModule, DishEditFormComponent, RouterModule],
  templateUrl: './dish-edit.component.html',
  styleUrls: ['./dish-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishEditComponent {
  private _routeId = this._route.snapshot.paramMap.get('id');
  private _dish$ = this._routeId
    ? this._dishService.getDish(this._routeId)
    : of(undefined);
  vm$ = combineLatest([this._dish$, this._tagService.getTags()]).pipe(
    map(([dish, tags]) => {
      if (!dish) {
        return {
          name: '',
          description: '',
          link: '',
          type: 'main' as DishType,
          tags: tags.map<TagModel>((tag) => ({
            ...tag,
            checked: false,
          })),
          notes: '',
        };
      } else {
        return {
          name: dish.name,
          description: dish.description,
          link: dish.link,
          type: dish.type,
          tags: tags.map<TagModel>((tag) => ({
            ...tag,
            checked: !!dish?.tags.find((dishTag) => dishTag.id === tag.id),
          })),
          notes: dish.notes,
        };
      }
    })
  );

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dishService: DishService,
    private _tagService: TagService
  ) {}

  async onSave(details: DishEditDetails): Promise<void> {
    if (!this._routeId) {
      this._dishService
        .createDish(details)
        .subscribe((newId) =>
          this._router.navigate(['..', newId], { relativeTo: this._route })
        );
    } else {
      this._dish$
        .pipe(
          first(),
          concatMap((dish) => {
            if (dish) {
              return this._dishService.updateDish(dish, details);
            } else {
              return of(undefined);
            }
          })
        )
        .subscribe(() =>
          this._router.navigate(['..'], { relativeTo: this._route })
        );
    }
  }
}
