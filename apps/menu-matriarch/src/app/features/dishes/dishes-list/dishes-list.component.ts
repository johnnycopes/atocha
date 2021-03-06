import {
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  DishService,
  FilterService,
  RouterService,
  TagService,
} from '@atocha/menu-matriarch/data-access';
import { dishTrackByFn, groupTrackByFn } from '@atocha/menu-matriarch/ui';
import { DishContext, DishDefDirective } from './dish-def.directive';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishesListComponent {
  @Output() nameDblClick = new EventEmitter<void>();
  public vm$ = combineLatest([
    this._dishService.getDishes(),
    this._tagService.getTags(),
    this._filterService.state$,
    this._routerService.activeDishId$,
  ]).pipe(
    map(([dishes, tags, { text, tagIds, panel }, activeDishId]) => {
      const activeDish = dishes.find((dish) => dish.id === activeDishId);
      const filteredDishes = this._filterService.filterDishes({
        dishes,
        text,
        tagIds,
      });
      return {
        filteredDishes,
        activeDish,
        tags,
        searchText: text,
        filters: tagIds,
        filterPanel: panel,
        initialTab: activeDish?.type ?? 'main',
        total: filteredDishes.reduce(
          (total, { dishes }) => total + dishes.length,
          0
        ),
      };
    })
  );
  public readonly groupTrackByFn = groupTrackByFn;
  public readonly dishTrackByFn = dishTrackByFn;

  @ContentChild(DishDefDirective)
  public dishDef: DishDefDirective | undefined;

  public get dishTemplate(): TemplateRef<DishContext> | null {
    return this.dishDef?.template ?? null;
  }

  constructor(
    private _dishService: DishService,
    private _filterService: FilterService,
    private _routerService: RouterService,
    private _tagService: TagService
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
