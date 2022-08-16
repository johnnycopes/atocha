import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '../_generic/button/button.component';
import { CardComponent } from '../_generic/card/card.component';
import { CheckboxComponent } from '@atocha/core/ui';
import { Tag } from '@atocha/menu-matriarch/types';
import { TagComponent } from '../tags/tag/tag.component';
import { TagDefDirective } from '../tags/tags-list/tag-def.directive';
import { TagsListComponent } from '../tags/tags-list/tags-list.component';

@Component({
  standalone: true,
  selector: 'ui-filters',
  imports: [
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    CommonModule,
    FormsModule,
    TagComponent,
    TagDefDirective,
    TagsListComponent,
  ],
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
