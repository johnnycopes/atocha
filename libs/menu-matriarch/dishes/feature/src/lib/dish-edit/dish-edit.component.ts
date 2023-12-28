import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, combineLatest, concatMap, first, map, of } from 'rxjs';

import {
  DishData,
  DishService,
} from '@atocha/menu-matriarch/dishes/data-access';
import { IngredientService } from '@atocha/menu-matriarch/ingredients/data-access';
import { TagService } from '@atocha/menu-matriarch/tags/data-access';
import { IngredientModel, TagModel } from '@atocha/menu-matriarch/shared/util';
import {
  DishConfig,
  DishEditFormComponent,
} from './dish-edit-form/dish-edit-form.component';

@Component({
  standalone: true,
  selector: 'app-dish-edit',
  imports: [CommonModule, DishEditFormComponent, RouterModule],
  template: `
    <app-dish-edit-form
      *ngIf="dish$ | async as dish"
      [dish]="dish"
      (save)="onSave($event)"
    ></app-dish-edit-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishEditComponent {
  private _routeId = this._route.snapshot.paramMap.get('id');
  private _dish$ = this._routeId
    ? this._dishService.getOne(this._routeId)
    : of(undefined);
  dish$: Observable<DishConfig> = combineLatest([
    this._dish$,
    this._ingredientService.getAll(),
    this._tagService.getAll(),
  ]).pipe(
    map(([dish, ingredients, tags]) => ({
      name: dish?.name ?? '',
      description: dish?.description ?? '',
      link: dish?.link ?? '',
      type: dish?.type ?? 'main',
      tagModels: tags.map<TagModel>((tag) => ({
        ...tag,
        checked: !!dish?.tags.find(({ id }) => id === tag.id) ?? false,
      })),
      ingredientModels: ingredients.map<IngredientModel>((ingredient) => ({
        ...ingredient,
        checked:
          !!dish?.ingredients.find(({ id }) => id === ingredient.id) ?? false,
      })),
      notes: dish?.notes ?? '',
    }))
  );

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dishService: DishService,
    private _ingredientService: IngredientService,
    private _tagService: TagService
  ) {}

  async onSave(data: DishData): Promise<void> {
    if (!this._routeId) {
      this._dishService
        .create(data)
        .subscribe((newId) =>
          this._router.navigate(['..', newId], { relativeTo: this._route })
        );
    } else {
      this._dish$
        .pipe(
          first(),
          concatMap((dish) => {
            if (dish) {
              return this._dishService.update(dish, data);
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
