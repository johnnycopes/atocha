import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Dish } from '@models/dish.interface';
import { FilteredDishesGroup } from '@models/filtered-dishes.interface';
import { Meal } from '@models/meal.interface';
import { getDishTypes } from '@utility/domain/get-dish-types';
import { includes } from '@utility/generic/includes';

interface State {
  panel: boolean;
  tagIds: string[];
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _state$ = new BehaviorSubject<State>({
    panel: false,
    tagIds: [],
    text: '',
  });

  public get state$(): Observable<State> {
    return this._state$.asObservable();
  }

  public togglePanel(): void {
    this._state$.pipe(
      first(),
    ).subscribe(state => this._state$.next({ ...state, panel: !state.panel }));
  }

  public updateTagIds(tagIds: string[]): void {
    this._state$.pipe(
      first(),
    ).subscribe(state => this._state$.next({ ...state, tagIds }));
  }

  public updateText(text: string): void {
    this._state$.pipe(
      first(),
    ).subscribe(state => this._state$.next({ ...state, text }));
  }

  public filterMeals({ meals, text, tagIds }: {
    meals: Meal[],
    text: string,
    tagIds: string[],
  }): Meal[] {
    return meals.filter(meal => {
      return this._filterEntity({
        entityName: meal.name,
        entityDescription: meal.description,
        entityTagIds: meal.tags.map(({ id }) => id),
        filterText: text,
        filterTagIds: tagIds,
      }) || meal.dishes.some(dish => this._filterEntity({
        entityName: dish.name,
        entityDescription: dish.description,
        entityTagIds: [],
        filterText: text,
        filterTagIds: tagIds,
      }));
    });
  }

  public filterDishes({ dishes, text, tagIds }: {
    dishes: Dish[],
    text: string,
    tagIds: string[],
  }): FilteredDishesGroup[] {
    return getDishTypes().map(type => ({
      type,
      dishes: dishes.filter(dish =>
        dish.type === type && this._filterEntity({
          entityName: dish.name,
          entityDescription: dish.description,
          entityTagIds: dish.tags.map(({ id }) => id),
          filterText: text,
          filterTagIds: tagIds,
        })
      ),
      placeholderText: `No ${type !== 'dessert'
        ? `${type} dishes`
        : `${type}s`} to display`,
    }));
  }

  private _filterEntity({ entityName, entityDescription, entityTagIds, filterText, filterTagIds }: {
    entityName: string,
    entityDescription: string,
    entityTagIds: string[],
    filterText: string,
    filterTagIds: string[],
  }): boolean {
    const entityHasText = includes([entityName, entityDescription], filterText);
    const entityHasTags = filterTagIds.length === 0 || includes(filterTagIds, entityTagIds);
    return entityHasText && entityHasTags;
  }
}
