import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';

import { AuthService } from '@atocha/core/data-access';
import { Dish } from '@atocha/menu-matriarch/util';
import { mapDishDtoToDish } from './internal/mappers/map-dish-dto-to-dish';
import {
  DishDataService,
  EditableDishData,
} from './internal/dish-data.service';
import { IngredientService } from './ingredient.service';
import { RouterService } from './internal/router.service';
import { TagService } from './tag.service';

export type DishData = EditableDishData;

@Injectable({
  providedIn: 'root',
})
export class DishService {
  activeDishId$ = this._routerService.activeDishId$;

  constructor(
    private _authService: AuthService,
    private _dishDataService: DishDataService,
    private _ingredientService: IngredientService,
    private _routerService: RouterService,
    private _tagService: TagService
  ) {}

  getDish(id: string): Observable<Dish | undefined> {
    return combineLatest([
      this._dishDataService.getDish(id),
      this._ingredientService.getIngredients(),
      this._tagService.getTags(),
    ]).pipe(
      map(([dishDto, ingredients, tags]) => {
        if (!dishDto) {
          return undefined;
        }
        return mapDishDtoToDish(dishDto, ingredients, tags);
      })
    );
  }

  getDishes(): Observable<Dish[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return combineLatest([
            this._dishDataService.getDishes(uid),
            this._ingredientService.getIngredients(),
            this._tagService.getTags(),
          ]).pipe(
            map(([dishDtos, ingredients, tags]) =>
              dishDtos.map((dishDto) =>
                mapDishDtoToDish(dishDto, ingredients, tags)
              )
            )
          );
        }
        return of([]);
      })
    );
  }

  createDish(dish: EditableDishData): Observable<string | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(async (uid) => {
        if (uid) {
          const id = await this._dishDataService.createDish(uid, dish);
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  async updateDish(dish: Dish, data: EditableDishData): Promise<void> {
    return this._dishDataService.updateDish(dish, data);
  }

  async deleteDish(dish: Dish): Promise<void> {
    return this._dishDataService.deleteDish(dish);
  }
}
