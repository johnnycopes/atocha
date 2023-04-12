import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { combineLatest, of, Subject } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  first,
  map,
  startWith,
} from 'rxjs/operators';

import { recordToArray } from '@atocha/core/util';
import {
  DishService,
  MealService,
  TagService,
  UserService,
} from '@atocha/menu-matriarch/data-access';
import { Dish, TagModel } from '@atocha/menu-matriarch/util';
import { MealEditFormComponent } from './meal-edit-form/meal-edit-form.component';

interface MealEditForm {
  name: string;
  description: string;
  dishIds: string[];
  tagIds: string[];
}

type FormDishes = Record<string, boolean>;

@Component({
  standalone: true,
  selector: 'app-meal-edit',
  imports: [CommonModule, MealEditFormComponent, RouterModule],
  template: `
    <app-meal-edit-form
      *ngIf="vm$ | async as vm"
      [vm]="vm"
      (dishClick)="onDishClick($event)"
      (dishesChange)="onDishChange($event)"
      (save)="onSave($event)"
    ></app-meal-edit-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealEditComponent {
  private _routeId = this._route.snapshot.paramMap.get('id');
  private _dishIds = this._route.snapshot.queryParamMap.get('dishes');
  private _formDishes$ = new Subject<FormDishes | null>();
  _meal$ = this._routeId
    ? this._mealService.getMeal(this._routeId)
    : of(undefined);
  vm$ = combineLatest([
    this._meal$,
    this._dishService.getDishes(),
    this._tagService.getTags(),
    this._userService.getPreferences(),
    this._formDishes$.pipe(
      startWith(
        this._dishIds ? this._transformDishIds(JSON.parse(this._dishIds)) : null
      ),
      distinctUntilChanged()
    ),
  ]).pipe(
    map(([meal, allDishes, tags, preferences, formDishes]) => {
      const dishes = formDishes
        ? this._transformFormDishes(allDishes, formDishes)
        : meal?.dishes ?? [];
      const dishesModel = dishes.map((dish) => dish.id);
      const fallbackText = preferences?.emptyMealText ?? '';
      const orientation = preferences?.mealOrientation ?? 'horizontal';
      if (!meal) {
        return {
          name: '',
          description: '',
          tags: tags.map<TagModel>((tag) => ({
            ...tag,
            checked: false,
          })),
          dishes,
          dishesModel,
          fallbackText,
          orientation,
        };
      } else {
        return {
          name: meal.name,
          description: meal.description,
          tags: tags.map<TagModel>((tag) => ({
            ...tag,
            checked: !!meal?.tags.find((mealTag) => mealTag.id === tag.id),
          })),
          dishes,
          dishesModel,
          fallbackText,
          orientation,
        };
      }
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

  onDishChange(dishesModel: FormDishes): void {
    this._formDishes$.next(dishesModel);
  }

  async onSave(form: NgForm): Promise<void> {
    const details: MealEditForm = {
      name: form.value.name,
      description: form.value.description,
      tagIds: recordToArray<string>(form.value.tags),
      dishIds: recordToArray<string>(form.value.dishes),
    };
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

  private _transformFormDishes(
    allDishes: Dish[],
    formDishes: Record<string, boolean>
  ): Dish[] {
    const dishes: Dish[] = [];

    for (const dishId in formDishes) {
      if (formDishes[dishId]) {
        const dish = allDishes.find(({ id }) => id === dishId);
        if (dish) {
          dishes.push(dish);
        }
      }
    }

    return dishes;
  }

  private _transformDishIds(dishIds: string[]): Record<string, boolean> {
    return dishIds.reduce((accum, id) => {
      accum[id] = true;
      return accum;
    }, {} as Record<string, boolean>);
  }
}
