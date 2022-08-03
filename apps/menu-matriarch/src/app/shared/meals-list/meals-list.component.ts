import {
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { trackByFactory } from '@atocha/core/ui';
import { Meal } from '@atocha/menu-matriarch/types';
import { FilterService, MealService, RouterService, TagService, UserService } from '@atocha/menu-matriarch/data-access';
import { MealDefContext, MealDefDirective } from './meal-def.directive';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    map(([meals, tags, preferences, { text, tagIds, panel }, activeMealId]) => {
      const filteredMeals = this._filterService.filterMeals({
        meals,
        text,
        tagIds,
      });
      return {
        filteredMeals,
        activeMeal: meals.find((meal) => meal.id === activeMealId),
        tags,
        preferences,
        searchText: text,
        filters: tagIds,
        filterPanel: panel,
        total: filteredMeals.length,
      };
    })
  );
  public readonly trackByFn = trackByFactory<Meal>(({ id }) => id);

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
    private _userService: UserService
  ) {}

  onSearchTextChange(text: string): void {
    this._filterService.updateText(text);
  }

  onFiltersButtonClick(): void {
    this._filterService.togglePanel();
  }

  onFiltersChange(filters: string[]): void {
    this._filterService.updateTagIds(filters);
  }
}
