import { Injectable } from '@angular/core';
import { Observable, combineLatest, concatMap, first, map, of } from 'rxjs';

import { AuthService } from '@atocha/firebase/data-access';
import { IEntityService } from '@atocha/menu-matriarch/shared/data-access-api';
import { DishService } from '@atocha/menu-matriarch/dishes/data-access';
import { RouterService } from '@atocha/menu-matriarch/shared/data-access-routing';
import { Meal } from '@atocha/menu-matriarch/shared/util';
import { TagService } from '@atocha/menu-matriarch/tags/data-access';
import { EditableMealData, MealDtoService } from './internal/meal-dto.service';
import { mapMealDtoToMeal } from './internal/map-meal-dto-to-meal';

export type MealData = EditableMealData;

@Injectable({
  providedIn: 'root',
})
export class MealService implements IEntityService<Meal, EditableMealData> {
  activeMealId$ = this._routerService.activeMealId$;

  constructor(
    private _authService: AuthService,
    private _dishService: DishService,
    private _mealDtoService: MealDtoService,
    private _routerService: RouterService,
    private _tagService: TagService
  ) {}

  getOne(id: string): Observable<Meal | undefined> {
    return combineLatest([
      this._mealDtoService.getOne(id),
      this._dishService.getAll(),
      this._tagService.getAll(),
    ]).pipe(
      map(([mealDto, dishes, tags]) => {
        if (!mealDto) {
          return undefined;
        }
        return mapMealDtoToMeal({ mealDto, dishes, tags });
      })
    );
  }

  getAll(): Observable<Meal[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return combineLatest([
            this._mealDtoService.getAll(uid),
            this._dishService.getAll(),
            this._tagService.getAll(),
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

  create(meal: EditableMealData): Observable<string | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(async (uid) => {
        if (uid) {
          const id = await this._mealDtoService.create(uid, meal);
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  async update(meal: Meal, data: EditableMealData): Promise<void> {
    return this._mealDtoService.update(meal, data);
  }

  async delete(meal: Meal): Promise<void> {
    return this._mealDtoService.delete(meal);
  }
}
