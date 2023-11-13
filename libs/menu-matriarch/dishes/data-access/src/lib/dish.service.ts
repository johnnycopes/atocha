import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';

import { AuthService } from '@atocha/firebase/data-access';
import { IEntityService } from '@atocha/menu-matriarch/shared/data-access-api';
import { IngredientService } from '@atocha/menu-matriarch/ingredients/data-access';
import { RouterService } from '@atocha/menu-matriarch/shared/data-access-routing';
import { Dish } from '@atocha/menu-matriarch/shared/util';
import { TagService } from '@atocha/menu-matriarch/tags/data-access';
import { DishDtoService, EditableDishData } from './internal/dish-data.service';
import { mapDishDtoToDish } from './internal/map-dish-dto-to-dish';

export type DishData = EditableDishData;

@Injectable({
  providedIn: 'root',
})
export class DishService implements IEntityService<Dish, EditableDishData> {
  activeDishId$ = this._routerService.activeDishId$;

  constructor(
    private _authService: AuthService,
    private _dishDataService: DishDtoService,
    private _ingredientService: IngredientService,
    private _routerService: RouterService,
    private _tagService: TagService
  ) {}

  getOne(id: string): Observable<Dish | undefined> {
    return combineLatest([
      this._dishDataService.getOne(id),
      this._ingredientService.getMany(),
      this._tagService.getMany(),
    ]).pipe(
      map(([dishDto, ingredients, tags]) => {
        if (!dishDto) {
          return undefined;
        }
        return mapDishDtoToDish(dishDto, ingredients, tags);
      })
    );
  }

  getMany(): Observable<Dish[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return combineLatest([
            this._dishDataService.getMany(uid),
            this._ingredientService.getMany(),
            this._tagService.getMany(),
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

  create(dish: EditableDishData): Observable<string | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(async (uid) => {
        if (uid) {
          const id = await this._dishDataService.create(uid, dish);
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  async update(dish: Dish, data: EditableDishData): Promise<void> {
    return this._dishDataService.update(dish, data);
  }

  async delete(dish: Dish): Promise<void> {
    return this._dishDataService.delete(dish);
  }
}
