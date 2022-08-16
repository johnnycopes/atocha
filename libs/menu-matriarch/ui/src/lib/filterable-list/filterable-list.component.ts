import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { PluralPipe } from '@atocha/core/ui';
import { Tag } from '@atocha/menu-matriarch/types';
import { ButtonComponent } from '../_generic/button/button.component';
import { FiltersButtonComponent } from '../filters-button/filters-button.component';
import { FiltersComponent } from '../filters/filters.component';
import { SearchInputComponent } from '../_generic/search-input/search-input.component';
import { SectionComponent } from '../_generic/section/section.component';

@Component({
  standalone: true,
  selector: 'ui-filterable-list',
  imports: [
    ButtonComponent,
    CommonModule,
    FiltersButtonComponent,
    FiltersComponent,
    PluralPipe,
    SearchInputComponent,
    SectionComponent,
  ],
  templateUrl: './filterable-list.component.html',
  styleUrls: ['./filterable-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterableListComponent {
  @Input() total = 0;
  @Input() searchText = '';
  @Input() filters: string[] = [];
  @Input() isPanelOpen = false;
  @Input() tags: Tag[] = [];
  @Input() entity = 'Item';
  @Input() pluralEntity: string | undefined;
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() filtersChange = new EventEmitter<string[]>();
  @Output() filtersButtonClick = new EventEmitter<void>();
  @Output() newButtonClick = new EventEmitter<void>();
  @Output() nameDblClick = new EventEmitter<void>();
}
