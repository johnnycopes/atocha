import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of, Subject } from 'rxjs';
import { concatMap, distinctUntilChanged, first, map, startWith, tap } from 'rxjs/operators';

import { Dish } from '@models/dish.interface';
import { TagModel } from '@models/tag-model.interface';
import { DishService } from '@services/dish.service';
import { MealService } from '@services/meal.service';
import { TagService } from '@services/tag.service';
import { UserService } from '@services/user.service';
import { getDishTypes } from '@utility/domain/get-dish-types';
import { trackById, trackBySelf } from '@utility/domain/track-by-functions';
import { recordToArray } from '@utility/generic/record-to-array';

interface MealEditForm {
  name: string;
  description: string;
  dishIds: string[];
  tagIds: string[];
}

type FormDishes = Record<string, boolean>;

@Component({
  selector: 'app-meal-edit',
  templateUrl: './meal-edit.component.html',
  styleUrls: ['./meal-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealEditComponent {
  private _routeId = this._route.snapshot.paramMap.get('id');
  private _dishIds = this._route.snapshot.queryParamMap.get('dishes');
  private _formDishes$ = new Subject<FormDishes | null>();
  public _meal$ = this._routeId
    ? this._mealService.getMeal(this._routeId)
    : of(undefined);
  public vm$ = combineLatest([
    this._meal$,
    this._dishService.getDishes(),
    this._tagService.getTags(),
    this._userService.getPreferences(),
    this._formDishes$.pipe(
      startWith(this._dishIds
        ? this._transformDishIds(JSON.parse(this._dishIds))
        : null
      ),
      distinctUntilChanged(),
    ),
  ]).pipe(
    map(([meal, allDishes, tags, preferences, formDishes]) => {
      const dishes = formDishes
        ? this._transformFormDishes(allDishes, formDishes)
        : meal?.dishes ?? [];
      const dishesModel = dishes.map(dish => dish.id);
      const fallbackText = preferences?.emptyMealText ?? '';
      const orientation = preferences?.mealOrientation ?? 'horizontal';
      if (!meal) {
        return {
          name: '',
          description: '',
          tags: tags.map<TagModel>(tag => ({
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
          ...meal,
          tags: tags.map<TagModel>(tag => ({
            ...tag,
            checked: !!meal?.tags.find(mealTag => mealTag.id === tag.id)
          })),
          dishes,
          dishesModel,
          fallbackText,
          orientation,
        };
      }
    })
  );
  public readonly dishTypes = getDishTypes();
  public readonly typeTrackByFn = trackBySelf;
  public readonly dishTrackByFn = trackById;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dishService: DishService,
    private _mealService: MealService,
    private _tagService: TagService,
    private _userService: UserService,
  ) { }

  public onDishChange(dishesModel: FormDishes): void {
    this._formDishes$.next(dishesModel);
  }

  public async onSave(form: NgForm): Promise<void> {
    const details: MealEditForm = {
      name: form.value.name,
      description: form.value.description,
      tagIds: recordToArray<string>(form.value.tags),
      dishIds: recordToArray<string>(form.value.dishes),
    };
    if (!this._routeId) {
      this._mealService.createMeal(details).pipe(
        tap(newId => this._router.navigate(['..', newId], { relativeTo: this._route }))
      ).subscribe();
    } else {
      this._meal$.pipe(
        first(),
        concatMap(meal => {
          if (meal) {
            return this._mealService.updateMeal(meal.id, details);
          } else {
            return of(undefined);
          }
        }),
        tap(() => this._router.navigate(['..'], { relativeTo: this._route }))
      ).subscribe();
    }
  }

  private _transformFormDishes(
    allDishes: Dish[],
    formDishes: Record<string, boolean>,
  ): Dish[] {
    const dishes: Dish[] = [];
    for (const dishId in formDishes) {
      if (formDishes[dishId]) {
        const dish = allDishes.find(dish => dish.id === dishId);
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
