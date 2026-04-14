import { Injectable, inject } from '@angular/core';
import { Observable, catchError, combineLatest, from, map, of } from 'rxjs';

import { IEntityService } from '@atocha/menu-matriarch/shared/data-access-api';
import { IngredientService } from '@atocha/menu-matriarch/ingredients/data-access';
import { RouterService } from '@atocha/menu-matriarch/shared/data-access-routing';
import { Dish } from '@atocha/menu-matriarch/shared/util';
import { TagService } from '@atocha/menu-matriarch/tags/data-access';
import { DishDtoService, EditableDishData } from './internal/dish-dto.service';
import { mapDishDtoToDish } from './internal/map-dish-dto-to-dish';

export type DishData = EditableDishData;

@Injectable({
  providedIn: 'root',
})
export class DishService implements IEntityService<Dish, EditableDishData> {
  private _dishDtoService = inject(DishDtoService);
  private _ingredientService = inject(IngredientService);
  private _routerService = inject(RouterService);
  private _tagService = inject(TagService);

  activeDishId$ = this._routerService.activeDishId$;

  getOne(id: string): Observable<Dish | undefined> {
    return combineLatest([
      this._dishDtoService.getOne(id),
      this._ingredientService.getAll(),
      this._tagService.getAll(),
    ]).pipe(
      map(([dishDto, ingredients, tags]) => {
        if (!dishDto) {
          return undefined;
        }
        return mapDishDtoToDish(dishDto, ingredients, tags);
      })
    );
  }

  getAll(
    { tags }: { tags?: boolean } = {
      tags: false,
    }
  ): Observable<Dish[]> {
    return combineLatest([
      this._dishDtoService.getAll(),
      tags ? this._tagService.getAll() : of([]),
    ]).pipe(
      map(([dishDtos, tags]) =>
        dishDtos.map((dishDto) => mapDishDtoToDish(dishDto, [], tags))
      )
    );
  }

  create(dish: EditableDishData): Observable<string | undefined> {
    return from(this._dishDtoService.create(dish)).pipe(
      catchError(() => of(undefined))
    );
  }

  async update(dish: Dish, data: EditableDishData): Promise<void> {
    return this._dishDtoService.update(dish, data);
  }

  async delete(dish: Dish): Promise<void> {
    return this._dishDtoService.delete(dish);
  }
}
