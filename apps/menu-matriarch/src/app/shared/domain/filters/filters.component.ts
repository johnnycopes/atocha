import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Tag } from '@models/tag.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
  @Input() tags: Tag[] = [];
  @Input() selected: string[] = [];
  @Output() selectedChange = new EventEmitter<string[]>();
  @Output() selectedClear = new EventEmitter<void>();

  public onTagChange(id: string, state: boolean): void {
    let updated: string[] = [];
    if (state) {
      updated = [...this.selected, id];
    } else {
      updated = this.selected.filter(currentId => currentId !== id);
    }
    this.selectedChange.emit(updated);
  }
}
