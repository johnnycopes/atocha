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
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { trackByFactory } from '@atocha/core/ui';
import { Meal } from '@atocha/menu-matriarch/util';
import {
  FilterService,
  MealService,
  TagService,
  UserService,
} from '@atocha/menu-matriarch/data-access';
import {
  FilterableListComponent,
  TabComponent,
  TabsetComponent,
} from '@atocha/menu-matriarch/ui';
import { MealDefContext, MealDefDirective } from './meal-def.directive';

@Component({
  standalone: true,
  selector: 'app-meals-list',
  imports: [
    CommonModule,
    FilterableListComponent,
    TabsetComponent,
    TabComponent,
  ],
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealsListComponent {
  @Output() nameDblClick = new EventEmitter<void>();
  vm$ = combineLatest([
    this._mealService.getMeals(),
    this._tagService.getTags(),
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
