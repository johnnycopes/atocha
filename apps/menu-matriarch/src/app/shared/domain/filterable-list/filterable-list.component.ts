import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilterService } from '@services/filter.service';
import { TagService } from '@services/tag.service';

@Component({
  selector: 'app-filterable-list',
  templateUrl: './filterable-list.component.html',
  styleUrls: ['./filterable-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterableListComponent {
  @Input() total = 0;
  @Input() entity = 'Item';
  @Input() pluralEntity: string | undefined;
  @Input() newRoute = '';
  @Output() nameDblClick = new EventEmitter<void>();

  public vm$ = combineLatest([
    this._filterService.state$,
    this._tagService.getTags(),
  ]).pipe(
    map(([filterState, tags]) => {
      return {
        searchText: filterState.text,
        filters: filterState.tagIds,
        filterPanel: filterState.panel,
        tags,
      };
    })
  );

  constructor(
    private _filterService: FilterService,
    private _tagService: TagService,
  ) { }

  public onSearchTextChange(text: string): void {
    this._filterService.updateText(text);
  }

  public onFiltersButtonClick(): void {
    this._filterService.togglePanel();
  }

  public onFiltersChange(filters: string[]): void {
    this._filterService.updateTagIds(filters);
  }
}
