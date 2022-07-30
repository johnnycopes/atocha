import { Component, ChangeDetectionStrategy, ContentChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { DishService } from '@services/dish.service';
import { FilterService } from '@services/filter.service';
import { RouterService } from '@services/router.service';
import { TagService } from '@services/tag.service';
import { trackByDishType, trackById } from '@utility/domain/track-by-functions';
import { DishContext, DishDefDirective } from './dish-def.directive';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishesListComponent {
  @Output() nameDblClick = new EventEmitter<void>();
  public vm$ = combineLatest([
    this._dishService.getDishes(),
    this._tagService.getTags(),
    this._filterService.state$,
    this._routerService.activeDishId$,
  ]).pipe(
    map(([dishes, tags, filterState, activeDishId]) => {
      const activeDish = dishes.find(dish => dish.id === activeDishId);
      const filteredDishes = this._filterService.filterDishes({
        dishes, text: filterState.text, tagIds: filterState.tagIds,
      });
      return {
        filteredDishes,
        activeDish,
        tags,
        searchText: filterState.text,
        filters: filterState.tagIds,
        filterPanel: filterState.panel,
        initialTab: activeDish?.type ?? 'main',
        total: filteredDishes.reduce((total, { dishes }) => total + dishes.length, 0),
      };
    })
  );
  public readonly groupTrackByFn = trackByDishType;
  public readonly dishTrackByFn = trackById;

  @ContentChild(DishDefDirective)
  public dishDef: DishDefDirective | undefined;

  public get dishTemplate(): TemplateRef<DishContext> | null {
    return this.dishDef?.template ?? null;
  }

  constructor(
    private _dishService: DishService,
    private _filterService: FilterService,
    private _routerService: RouterService,
    private _tagService: TagService,
  ) { }
}
