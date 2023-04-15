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
import {
  AppData,
  MealEditFormComponent,
  MealDetails,
} from './meal-edit-form/meal-edit-form.component';

@Component({
  standalone: true,
  selector: 'app-meal-edit',
  imports: [CommonModule, MealEditFormComponent, RouterModule],
  template: `
    <app-meal-edit-form
      *ngIf="vm$ | async as vm"
      [data]="vm"
      (dishClick)="onDishClick($event)"
      (save)="onSave($event)"
    ></app-meal-edit-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealEditComponent {
  private _routeId = this._route.snapshot.paramMap.get('id');
  _meal$ = this._routeId
    ? this._mealService.getMeal(this._routeId)
    : of(undefined);
  vm$: Observable<AppData> = combineLatest([
    this._meal$,
    this._dishService.getDishes(),
    this._tagService.getTags(),
    this._userService.getPreferences(),
  ]).pipe(
    map(([meal, allDishes, allTags, preferences]) => {
      const fallbackText = preferences?.emptyMealText ?? '';
      const orientation = preferences?.mealOrientation ?? 'horizontal';
      return {
        meal: {
          id: meal?.id ?? '',
          uid: meal?.uid ?? '',
          name: meal?.name ?? '',
          description: meal?.description ?? '',
          dishes: meal?.dishes ?? [],
          tags: meal?.tags ?? [],
        },
        allTags,
        allDishes,
        fallbackText,
        orientation,
      };
    })
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
