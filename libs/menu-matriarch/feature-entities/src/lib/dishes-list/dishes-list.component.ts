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
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  DishService,
  FilterService,
  TagService,
} from '@atocha/menu-matriarch/data-access';
import {
  FilterableListComponent,
  TabComponent,
  TabsetComponent,
  dishTrackByFn,
  groupTrackByFn,
} from '@atocha/menu-matriarch/ui';
import { DishContext, DishDefDirective } from './dish-def.directive';

@Component({
  standalone: true,
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
    this._dishService.getDishes(),
    this._tagService.getTags(),
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
