import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { concatMap, first, map, tap } from 'rxjs/operators';

import { DishDto } from '@models/dtos/dish-dto.interface';
import { Dish } from '@models/dish.interface';
import { Tag } from '@models/tag.interface';
import { AuthService } from './auth.service';
import { DishDataService } from './internal/dish-data.service';
import { TagService } from './tag.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(
    private _authService: AuthService,
    private _dishDataService: DishDataService,
    private _tagService: TagService,
  ) { }

  public getDish(id: string): Observable<Dish | undefined> {
    return combineLatest([
      this._dishDataService.getDish(id),
      this._tagService.getTags(),
    ]).pipe(
      map(([dishDto, tags]) => {
        if (!dishDto) {
          return undefined;
        }
        return this._transformDto(dishDto, tags);
      })
    );
  }

  public getDishes(): Observable<Dish[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(uid => {
        if (uid) {
          return combineLatest([
            this._dishDataService.getDishes(uid),
            this._tagService.getTags(),
          ]).pipe(
            map(([dishDtos, tags]) =>dishDtos.map(dishDto => this._transformDto(dishDto, tags)))
          );
        }
        return of([]);
      })
    );
  }

  public createDish(dish: Partial<Omit<DishDto, 'id' | 'uid'>>): Observable<string | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(async uid => {
        if (uid) {
          const id = await this._dishDataService.createDish({ uid, dish });
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  public updateDish(
    id: string,
    data: Partial<Omit<DishDto, 'usages' | 'menus'>>
  ): Observable<Dish | undefined> {
    return this.getDish(id).pipe(
      first(),
      tap(async dish => {
        if (!dish) {
          return;
        }
        await this._dishDataService.updateDish(dish, data);
      })
    );
  }

  public deleteDish(id: string): Observable<Dish | undefined> {
    return this.getDish(id).pipe(
      first(),
      tap(async dish => {
        if (!dish) {
          return;
        }
        await this._dishDataService.deleteDish(dish);
      })
    );
  }

  private _transformDto(dishDto: DishDto, tags: Tag[]): Dish {
    return {
      id: dishDto.id,
      uid: dishDto.uid,
      name: dishDto.name,
      description: dishDto.description,
      favorited: dishDto.favorited,
      link: dishDto.link,
      notes: dishDto.notes,
      type: dishDto.type,
      usages: dishDto.usages,
      mealIds: dishDto.mealIds,
      menuIds: dishDto.menuIds,
      ingredients: [],
      tags: tags.filter(tag => dishDto.tagIds.includes(tag.id))
    };
  }
}
