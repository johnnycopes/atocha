import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';

import { AuthService } from '@atocha/core/data-access';
import { Meal } from '@atocha/menu-matriarch/util';
import { mapMealDtoToMeal } from './internal/mappers/map-meal-dto-to-meal';
import {
  EditableMealData,
  MealDataService,
} from './internal/meal-data.service';
import { RouterService } from './internal/router.service';
import { DishService } from './dish.service';
import { TagService } from './tag.service';

export type MealData = EditableMealData;

@Injectable({
  providedIn: 'root',
})
export class MealService {
  activeMealId$ = this._routerService.activeMealId$;

  constructor(
    private _authService: AuthService,
    private _dishService: DishService,
    private _mealDataService: MealDataService,
    private _routerService: RouterService,
    private _tagService: TagService
  ) {}

  getMeal(id: string): Observable<Meal | undefined> {
    return combineLatest([
      this._mealDataService.getMeal(id),
      this._dishService.getDishes(),
      this._tagService.getTags(),
    ]).pipe(
      map(([mealDto, dishes, tags]) => {
        if (!mealDto) {
          return undefined;
        }
        return mapMealDtoToMeal({ mealDto, dishes, tags });
      })
    );
  }

  getMeals(): Observable<Meal[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return combineLatest([
            this._mealDataService.getMeals(uid),
            this._dishService.getDishes(),
            this._tagService.getTags(),
          ]).pipe(
            map(([mealDtos, dishes, tags]) =>
              mealDtos.map((mealDto) =>
                mapMealDtoToMeal({ mealDto, dishes, tags })
              )
            )
          );
        }
        return of([]);
      })
    );
  }

  createMeal(meal: EditableMealData): Observable<string | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(async (uid) => {
        if (uid) {
          const id = await this._mealDataService.createMeal(uid, meal);
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  async updateMeal(meal: Meal, data: EditableMealData): Promise<void> {
    return this._mealDataService.updateMeal(meal, data);
  }

  async deleteMeal(meal: Meal): Promise<void> {
    return this._mealDataService.deleteMeal(meal);
  }
}
