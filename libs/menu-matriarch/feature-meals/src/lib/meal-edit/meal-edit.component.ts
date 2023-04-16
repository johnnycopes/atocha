import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';

import {
  DishService,
  MealService,
  TagService,
  UserService,
} from '@atocha/menu-matriarch/data-access';
import { DishModel, TagModel } from '@atocha/menu-matriarch/util';
import {
  MealEditFormComponent,
  MealDetails,
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
      (dishClick)="onDishClick($event)"
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
        checked: !!meal?.dishes.find(({ id }) => id === dish.id) || this._dishIds.includes(dish.id),
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

  onDishClick(id: string): void {
    this._router.navigate(['dishes', id]);
  }

  async onSave(details: MealDetails): Promise<void> {
    if (!this._routeId) {
      this._mealService
        .createMeal(details)
        .subscribe((newId) =>
          this._router.navigate(['..', newId], { relativeTo: this._route })
        );
    } else {
      this._meal$
        .pipe(
          first(),
          concatMap((meal) => {
            if (meal) {
              return this._mealService.updateMeal(meal, details);
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
