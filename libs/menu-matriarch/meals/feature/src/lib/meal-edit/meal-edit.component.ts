import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';

import { DishService } from '@atocha/menu-matriarch/dishes/data-access';
import {
  MealData,
  MealService,
} from '@atocha/menu-matriarch/meals/data-access';
import { UserService } from '@atocha/menu-matriarch/settings/data-access';
import { TagService } from '@atocha/menu-matriarch/tags/data-access';
import { DishModel, TagModel } from '@atocha/menu-matriarch/shared/util';
import {
  MealEditFormComponent,
  MealConfig,
} from './meal-edit-form/meal-edit-form.component';

@Component({
  standalone: true,
  selector: 'app-meal-edit',
  imports: [CommonModule, MealEditFormComponent, RouterModule],
  template: `
    <app-meal-edit-form
      *ngIf="meal$ | async as meal"
      [meal]="meal"
      (save)="onSave($event)"
    ></app-meal-edit-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealEditComponent {
  private _routeId = this._route.snapshot.paramMap.get('id');
  private _dishIds = this._route.snapshot.queryParamMap.get('dishes') ?? '';
  _meal$ = this._routeId
    ? this._mealService.getMeal(this._routeId)
    : of(undefined);

  meal$: Observable<MealConfig> = combineLatest([
    this._meal$,
    this._dishService.getDishes(),
    this._tagService.getTags(),
    this._userService.getPreferences(),
  ]).pipe(
    map(([meal, dishes, tags, preferences]) => ({
      id: meal?.id ?? '',
      uid: meal?.uid ?? '',
      name: meal?.name ?? '',
      description: meal?.description ?? '',
      dishModels: dishes.map<DishModel>((dish) => ({
        ...dish,
        checked:
          !!meal?.dishes.find(({ id }) => id === dish.id) ||
          this._dishIds.includes(dish.id),
      })),
      tagModels: tags.map<TagModel>((tag) => ({
        ...tag,
        checked: !!meal?.tags.find(({ id }) => id === tag.id) ?? false,
      })),
      emptyMealText: preferences?.emptyMealText ?? '',
      mealOrientation: preferences?.mealOrientation ?? 'horizontal',
    }))
  );

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dishService: DishService,
    private _mealService: MealService,
    private _tagService: TagService,
    private _userService: UserService
  ) {}

  async onSave(data: MealData): Promise<void> {
    if (!this._routeId) {
      this._mealService
        .createMeal(data)
        .subscribe((newId) =>
          this._router.navigate(['..', newId], { relativeTo: this._route })
        );
    } else {
      this._meal$
        .pipe(
          first(),
          concatMap((meal) => {
            if (meal) {
              return this._mealService.updateMeal(meal, data);
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
