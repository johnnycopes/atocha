import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { concatMap, first, map, tap } from 'rxjs/operators';

import { AuthService } from '@atocha/core/data-access';
import { MealDto, Meal, mapMealDtoToMeal } from '@atocha/menu-matriarch/util';
import { DishService } from './dish.service';
import { MealDataService } from './internal/meal-data.service';
import { TagService } from './tag.service';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  activeMealId$ = this._mealDataService.activeMealId$;

  constructor(
    private _authService: AuthService,
    private _dishService: DishService,
    private _mealDataService: MealDataService,
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

  createMeal(
    meal: Partial<Omit<MealDto, 'id' | 'uid'>>
  ): Observable<string | undefined> {
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

  updateMeal(id: string, data: Partial<MealDto>): Observable<Meal | undefined> {
    return this.getMeal(id).pipe(
      first(),
      tap(async (meal) => {
        if (!meal) {
          return;
        }
        await this._mealDataService.updateMeal(meal, data);
      })
    );
  }

  deleteMeal(id: string): Observable<Meal | undefined> {
    return this.getMeal(id).pipe(
      first(),
      tap(async (meal) => {
        if (!meal) {
          return;
        }
        await this._mealDataService.deleteMeal(meal);
      })
    );
  }
}
