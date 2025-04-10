import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';

import { trackByFactory } from '@atocha/core/ui';
import { MealService } from '@atocha/menu-matriarch/meals/data-access';
import { UserService } from '@atocha/menu-matriarch/settings/data-access';
import { TagService } from '@atocha/menu-matriarch/tags/data-access';
import { Meal } from '@atocha/menu-matriarch/shared/util';
import { FilterService } from '../filter.service';
import { FilterableListComponent } from '../filterable-list/filterable-list.component';
import { MealDefContext, MealDefDirective } from './meal-def.directive';

@Component({
  selector: 'app-meals-list',
  imports: [CommonModule, FilterableListComponent],
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealsListComponent {
  @Output() nameDblClick = new EventEmitter<void>();
  vm$ = combineLatest([
    this._mealService.getAll(),
    this._tagService.getAll(),
    this._userService.getPreferences(),
    this._filterService.state$,
    this._mealService.activeMealId$,
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
  readonly trackByFn = trackByFactory<Meal>(({ id }) => id);

  @ContentChild(MealDefDirective)
  mealDef: MealDefDirective | undefined;

  get mealTemplate(): TemplateRef<MealDefContext> | null {
    return this.mealDef?.template ?? null;
  }

  constructor(
    private _filterService: FilterService,
    private _mealService: MealService,
    private _router: Router,
    private _tagService: TagService,
    private _userService: UserService
  ) {}

  onSearchTextChange(text: string): void {
    this._filterService.updateText(text);
  }

  onNewButtonClick(): void {
    this._router.navigate(['meals', 'new']);
  }

  onFiltersButtonClick(): void {
    this._filterService.togglePanel();
  }

  onFiltersChange(filters: string[]): void {
    this._filterService.updateTagIds(filters);
  }
}
