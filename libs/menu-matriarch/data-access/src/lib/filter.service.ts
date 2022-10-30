import { Injectable } from '@angular/core';

import { includes, State } from '@atocha/core/util';
import {
  Dish,
  FilteredDishesGroup,
  Meal,
  getDishTypes,
} from '@atocha/menu-matriarch/util';

interface FilterState {
  panel: boolean;
  tagIds: string[];
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _state = new State<FilterState>({
    panel: false,
    tagIds: [],
    text: '',
  });

  state$ = this._state.get();

  togglePanel(): void {
    this._state.transformProp('panel', (open) => !open);
  }

  updateTagIds(tagIds: string[]): void {
    this._state.updateProp('tagIds', tagIds);
  }

  updateText(text: string): void {
    this._state.updateProp('text', text);
  }

  filterMeals({
    meals,
    text,
    tagIds,
  }: {
    meals: Meal[];
    text: string;
    tagIds: string[];
  }): Meal[] {
    return meals.filter((meal) => {
      return (
        this._filterEntity({
          entityName: meal.name,
          entityDescription: meal.description,
          entityTagIds: meal.tags.map(({ id }) => id),
          filterText: text,
          filterTagIds: tagIds,
        }) ||
        meal.dishes.some((dish) =>
          this._filterEntity({
            entityName: dish.name,
            entityDescription: dish.description,
            entityTagIds: [],
            filterText: text,
            filterTagIds: tagIds,
          })
        )
      );
    });
  }

  filterDishes({
    dishes,
    text,
    tagIds,
  }: {
    dishes: Dish[];
    text: string;
    tagIds: string[];
  }): FilteredDishesGroup[] {
    return getDishTypes().map((type) => ({
      type,
      dishes: dishes.filter(
        (dish) =>
          dish.type === type &&
          this._filterEntity({
            entityName: dish.name,
            entityDescription: dish.description,
            entityTagIds: dish.tags.map(({ id }) => id),
            filterText: text,
            filterTagIds: tagIds,
          })
      ),
      placeholderText: `No ${
        type !== 'dessert' ? `${type} dishes` : `${type}s`
      } to display`,
    }));
  }

  private _filterEntity({
    entityName,
    entityDescription,
    entityTagIds,
    filterText,
    filterTagIds,
  }: {
    entityName: string;
    entityDescription: string;
    entityTagIds: string[];
    filterText: string;
    filterTagIds: string[];
  }): boolean {
    const entityHasText = includes([entityName, entityDescription], filterText);
    const entityHasTags =
      filterTagIds.length === 0 || includes(filterTagIds, entityTagIds);
    return entityHasText && entityHasTags;
  }
}
