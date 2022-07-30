import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef, EventEmitter, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilterService } from '@services/filter.service';
import { MealService } from '@services/meal.service';
import { RouterService } from '@services/router.service';
import { TagService } from '@services/tag.service';
import { UserService } from '@services/user.service';
import { trackById } from '@utility/domain/track-by-functions';
import { MealDefContext, MealDefDirective } from './meal-def.directive';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealsListComponent {
  @Output() nameDblClick = new EventEmitter<void>();
  public vm$ = combineLatest([
    this._mealService.getMeals(),
    this._tagService.getTags(),
    this._userService.getPreferences(),
    this._filterService.state$,
    this._routerService.activeMealId$,
  ]).pipe(
    map(([meals, tags, preferences, filterState, activeMealId]) => {
      const filteredMeals = this._filterService.filterMeals({
        meals, text: filterState.text, tagIds: filterState.tagIds,
      });
      return {
        filteredMeals,
        activeMeal: meals.find(meal => meal.id === activeMealId),
        tags,
        preferences,
        searchText: filterState.text,
        filters: filterState.tagIds,
        filterPanel: filterState.panel,
        total: filteredMeals.length,
      };
    })
  );
  public readonly trackByFn = trackById;

  @ContentChild(MealDefDirective)
  public mealDef: MealDefDirective | undefined;

  public get mealTemplate(): TemplateRef<MealDefContext> | null {
    return this.mealDef?.template ?? null;
  }

  constructor(
    private _filterService: FilterService,
    private _mealService: MealService,
    private _routerService: RouterService,
    private _tagService: TagService,
    private _userService: UserService,
  ) { }
}
