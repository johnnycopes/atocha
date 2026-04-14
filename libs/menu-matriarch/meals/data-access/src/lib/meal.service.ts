import { Injectable, inject } from '@angular/core';
import { Observable, catchError, combineLatest, from, map, of } from 'rxjs';

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
  private _dishService = inject(DishService);
  private _mealDtoService = inject(MealDtoService);
  private _routerService = inject(RouterService);
  private _tagService = inject(TagService);

  activeMealId$ = this._routerService.activeMealId$;

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
    return combineLatest([
      this._mealDtoService.getAll(),
      this._dishService.getAll(),
      this._tagService.getAll(),
    ]).pipe(
      map(([mealDtos, dishes, tags]) =>
        mealDtos.map((mealDto) => mapMealDtoToMeal({ mealDto, dishes, tags }))
      )
    );
  }

  create(meal: EditableMealData): Observable<string | undefined> {
    return from(this._mealDtoService.create(meal)).pipe(
      catchError(() => of(undefined))
    );
  }

  async update(meal: Meal, data: EditableMealData): Promise<void> {
    return this._mealDtoService.update(meal, data);
  }

  async delete(meal: Meal): Promise<void> {
    return this._mealDtoService.delete(meal);
  }
}
