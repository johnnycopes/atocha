import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  ButtonComponent,
  PluralPipe,
  SearchInputComponent,
} from '@atocha/core/ui';
import {
  InputComponent,
  SectionComponent,
} from '@atocha/menu-matriarch/shared/ui';
import { Tag } from '@atocha/menu-matriarch/shared/util';
import { FiltersButtonComponent } from './filters-button/filters-button.component';
import { FiltersComponent } from './filters/filters.component';

@Component({
  selector: 'app-filterable-list',
  imports: [
    ButtonComponent,
    CommonModule,
    FiltersButtonComponent,
    FiltersComponent,
    PluralPipe,
    InputComponent,
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
