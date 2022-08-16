import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CheckboxComponent } from '@atocha/core/ui';
import { Tag } from '@atocha/menu-matriarch/types';
import { TagComponent } from '../tags/tag/tag.component';
import { TagsListComponent } from '../tags/tags-list/tags-list.component';
import { CardComponent } from '../_generic/card/card.component';

@Component({
  standalone: true,
  selector: 'ui-filters',
  imports: [FormsModule, CardComponent, CheckboxComponent, TagComponent, TagsListComponent],
  templateUrl: './filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Input() tags: Tag[] = [];
  @Input() selected: string[] = [];
  @Output() selectedChange = new EventEmitter<string[]>();
  @Output() selectedClear = new EventEmitter<void>();

  onTagChange(id: string, state: boolean): void {
    let updated: string[] = [];

    if (state) {
      updated = [...this.selected, id];
    } else {
      updated = this.selected.filter((currentId) => currentId !== id);
    }

    this.selectedChange.emit(updated);
  }
}
