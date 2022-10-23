import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { concatMap, first, map, tap } from 'rxjs/operators';

import { AuthService } from '@atocha/core/data-access';
import { Dish, DishDto, mapDishDtoToDish } from '@atocha/menu-matriarch/util';
import { DishDataService } from './internal/dish-data.service';
import { TagService } from './tag.service';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  activeDishId$ = this._dishDataService.activeDishId$;

  constructor(
    private _authService: AuthService,
    private _dishDataService: DishDataService,
    private _tagService: TagService
  ) {}

  getDish(id: string): Observable<Dish | undefined> {
    return combineLatest([
      this._dishDataService.getDish(id),
      this._tagService.getTags(),
    ]).pipe(
      map(([dishDto, tags]) => {
        if (!dishDto) {
          return undefined;
        }
        return mapDishDtoToDish(dishDto, tags);
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
            this._tagService.getTags(),
          ]).pipe(
            map(([dishDtos, tags]) =>
              dishDtos.map((dishDto) => mapDishDtoToDish(dishDto, tags))
            )
          );
        }
        return of([]);
      })
    );
  }

  createDish(
    dish: Partial<Omit<DishDto, 'id' | 'uid'>>
  ): Observable<string | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(async (uid) => {
        if (uid) {
          const id = await this._dishDataService.createDish({ uid, dish });
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  updateDish(
    id: string,
    data: Partial<Omit<DishDto, 'usages' | 'menus'>>
  ): Observable<Dish | undefined> {
    return this.getDish(id).pipe(
      first(),
      tap(async (dish) => {
        if (!dish) {
          return;
        }
        await this._dishDataService.updateDish(dish, data);
      })
    );
  }

  deleteDish(id: string): Observable<Dish | undefined> {
    return this.getDish(id).pipe(
      first(),
      tap(async (dish) => {
        if (!dish) {
          return;
        }
        await this._dishDataService.deleteDish(dish);
      })
    );
  }
}
