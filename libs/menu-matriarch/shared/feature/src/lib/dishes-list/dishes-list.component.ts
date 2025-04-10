import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';

import { DishService } from '@atocha/menu-matriarch/dishes/data-access';
import { TagService } from '@atocha/menu-matriarch/tags/data-access';
import {
  TabComponent,
  TabsetComponent,
  dishTrackByFn,
  groupTrackByFn,
} from '@atocha/menu-matriarch/shared/ui';
import { DishContext, DishDefDirective } from './dish-def.directive';
import { FilterService } from '../filter.service';
import { FilterableListComponent } from '../filterable-list/filterable-list.component';

@Component({
  selector: 'app-dishes-list',
  imports: [
    CommonModule,
    FilterableListComponent,
    TabsetComponent,
    TabComponent,
  ],
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishesListComponent {
  @Output() nameDblClick = new EventEmitter<void>();
  vm$ = combineLatest([
    this._dishService.getAll({ tags: true }),
    this._tagService.getAll(),
    this._filterService.state$,
    this._dishService.activeDishId$,
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
  readonly groupTrackByFn = groupTrackByFn;
  readonly dishTrackByFn = dishTrackByFn;

  @ContentChild(DishDefDirective)
  dishDef: DishDefDirective | undefined;

  get dishTemplate(): TemplateRef<DishContext> | null {
    return this.dishDef?.template ?? null;
  }

  constructor(
    private _dishService: DishService,
    private _filterService: FilterService,
    private _router: Router,
    private _tagService: TagService
  ) {}

  onSearchTextChange(text: string): void {
    this._filterService.updateText(text);
  }

  onNewButtonClick(): void {
    this._router.navigate(['dishes', 'new']);
  }

  onFiltersButtonClick(): void {
    this._filterService.togglePanel();
  }

  onFiltersChange(filters: string[]): void {
    this._filterService.updateTagIds(filters);
  }
}
